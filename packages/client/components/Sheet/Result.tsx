import BottomSheet from '@gorhom/bottom-sheet';
import React, { forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

interface ResultScannerProps {
  medicineInfo: MedicineInfo | null;
}

const ResultScanner = forwardRef(({ medicineInfo }: ResultScannerProps, ref) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  useImperativeHandle(ref, () => ({
    openSheet: () => {
      bottomSheetRef.current?.snapToIndex(0);
    },
  }));
  console.log('ResultScanner', medicineInfo);
  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={['80%']} enablePanDownToClose index={-1}>
      <View style={styles.contentContainer}>
        {medicineInfo && (
          <>
            <Text style={styles.title}>{medicineInfo.name}</Text>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Dosage:</Text>
              <Text style={styles.value}>
                {medicineInfo.dosage} {medicineInfo.unit}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Weight:</Text>
              <Text style={styles.value}>
                {medicineInfo.weight} {medicineInfo.weightUnit}
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{medicineInfo.description}</Text>

            <Text style={styles.sectionTitle}>Side Effects</Text>
            {medicineInfo.sideEffects.map((effect, index) => (
              <Text key={index} style={styles.listItem}>
                • {effect}
              </Text>
            ))}

            <Text style={styles.sectionTitle}>Warnings</Text>
            {medicineInfo.warnings.map((warning, index) => (
              <Text key={index} style={styles.listItem}>
                • {warning}
              </Text>
            ))}
          </>
        )}
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    width: 80,
  },
  value: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    marginBottom: 16,
  },
  listItem: {
    marginBottom: 4,
  },
});

export default ResultScanner;
