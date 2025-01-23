import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Stack } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Animated } from 'react-native';

import ResultScanner from '~/components/Sheet/Result';

interface MedicineInfo {
  name: string;
  dosage: string;
  unit: string;
  weight: string;
  weightUnit: string;
  description: string;
  sideEffects: string[];
  warnings: string[];
  alternatives?: string[];
  interactions?: string[];
  storage?: string;
  validity?: string;
}

const genAI = new GoogleGenerativeAI('AIzaSyCrRG2yo6jfoUuMG8P_qdxxCGJjQqcpdwU');

const MedicineScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [medicineInfo, setMedicineInfo] = useState<MedicineInfo | null>(null);
  const [flashMode, setFlashMode] = useState<'on' | 'off'>('off');
  const scanLineAnim = new Animated.Value(0);
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const sheetRef = useRef<{ openSheet: () => void }>(null);
  const cameraRef = useRef(null);
  const [imageUri, setImageUri] = useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      const permission = await requestPermission();
    })();
  }, []);

  React.useEffect(() => {
    if (scanning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [scanning]);

  const analyzeMedicineImage = async (imageBase64: string) => {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `Please analyze this medicine image and provide comprehensive details in the following JSON format:
        {
          "name": "Medicine name",
          "dosage": "Dosage amount",
          "unit": "Dosage unit (mg/ml/etc)",
          "weight": "Weight amount",
          "weightUnit": "Weight unit",
          "description": "Detailed description including primary uses and benefits",
          "sideEffects": ["List of common side effects"],
          "warnings": ["Important warnings and contraindications"],
          "alternatives": ["Similar alternative medicines"],
          "interactions": ["Known drug interactions"],
          "storage": "Storage instructions",
          "validity": "Expiry information"
        }
        If you cannot read the medicine details from the image clearly, suggest possible matches based on visible characteristics and mark them as "suggested".`;

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: imageBase64,
          },
        },
      ]);

      const response = await result.response;
      let responseText = response?.candidates?.[0]?.content.parts[0].text?.slice(7);
      responseText = responseText?.slice(0, -3);

      console.log('Response text:', responseText);

      if (!responseText) {
        console.error('Error analyzing medicine: No response text');
        return;
      }
      const medicineData = JSON.parse(responseText);

      console.log('Medicine data:', medicineData);

      setMedicineInfo(medicineData);
      if (sheetRef.current) {
        sheetRef.current.openSheet();
      }
    } catch (error) {
      console.error('Error analyzing medicine:', error);
    } finally {
      setScanning(false);
    }
  };

  const handleScan = async () => {
    if (!cameraRef.current) return;

    setScanning(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.8,
      });

      setImageUri(photo.uri);
      await analyzeMedicineImage(photo.base64);
    } catch (error) {
      console.error('Error taking picture:', error);
      setScanning(false);
    }
  };

  if (!permission?.granted) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Scanner', headerShown: false }} />
      <View style={styles.container}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={cameraType}
          enableTorch={flashMode === 'on'}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <MaterialIcons name="medication" size={24} color="white" />
              <Text style={styles.titleText}>Medicine Scanner</Text>
            </View>
          </View>
          <View style={styles.overlay}>
            <View style={styles.scanFrame}>
              <View style={styles.scanFrameCornerTopLeft} />
              <View style={styles.scanFrameCornerTopRight} />
              <View style={styles.scanFrameCornerBottomLeft} />
              <View style={styles.scanFrameCornerBottomRight} />
              {scanning && (
                <Animated.View
                  style={[
                    styles.scanLine,
                    {
                      transform: [
                        {
                          translateY: scanLineAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 300],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              )}
            </View>

            <View style={styles.controls}>
              {flashMode === 'off' ? (
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => {
                    setFlashMode('on');
                  }}>
                  <Ionicons name="flash-off" size={24} color="black" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => {
                    setFlashMode('off');
                  }}>
                  <Ionicons name="flash" size={24} color="black" />
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.captureButton} onPress={handleScan}>
                <Ionicons name="camera" size={32} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setCameraType(cameraType === 'back' ? 'front' : 'back')}>
                <MaterialIcons name="cameraswitch" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
        <ResultScanner medicineInfo={medicineInfo} ref={sheetRef} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  scanFrame: {
    width: 250,
    height: 300,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 150,
    position: 'relative',
  },
  scanLine: {
    height: 2,
    width: '100%',
    backgroundColor: '#4CAF50',
  },
  scanFrameCornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderColor: 'white',
    borderTopStartRadius: 20,
    width: 50,
    height: 50,
  },
  scanFrameCornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderColor: 'white',
    borderTopEndRadius: 20,
    width: 50,
    height: 50,
  },
  scanFrameCornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'white',
    borderBottomStartRadius: 20,
    width: 50,
    height: 50,
  },
  scanFrameCornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'white',
    borderBottomEndRadius: 20,
    width: 50,
    height: 50,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    width: 100,
  },
  infoValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  infoUnit: {
    fontSize: 14,
    color: '#666',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 40,
  },
  captureButton: {
    width: 90,
    height: 90,
    borderRadius: 32,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    borderWidth: 4,
    borderColor: 'gray',
  },
  iconButton: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default MedicineScanner;
