import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import * as Localization from 'expo-localization';
import * as Speech from 'expo-speech';
import * as SplashScreen from 'expo-splash-screen';
import { I18n } from 'i18n-js';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';

// Initialize translations
const translations = {
  en: {
    title: 'Paracetamol 500mg',
    verified: 'Verified',
    listen: 'Listen',
    pause: 'Pause',
    description: {
      label: 'Description',
      content: 'Pain reliever and fever reducer commonly used to treat mild to moderate pain.',
    },
    primaryUses: {
      label: 'Primary Uses',
      uses: ['Headache', 'Fever', 'Body Pain'],
    },
    dosage: {
      label: 'Recommended Dosage',
      content: '1-2 tablets every 4-6 hours as needed',
    },
    precautions: {
      label: 'Precautions',
      content: 'Do not exceed 8 tablets in 24 hours. Consult doctor if symptoms persist.',
    },
    addToList: 'Add to Medicine List',
  },
  hi: {
    title: 'पैरासिटामोल 500mg',
    verified: 'सत्यापित',
    listen: 'सुनें',
    pause: 'रोकें',
    description: {
      label: 'विवरण',
      content: 'दर्द निवारक और बुखार कम करने वाली दवा।',
    },
    primaryUses: {
      label: 'मुख्य उपयोग',
      uses: ['सिरदर्द', 'बुखार', 'शरीर में दर्द'],
    },
    dosage: {
      label: 'निर्धारित मात्रा',
      content: 'आवश्यकतानुसार हर 4-6 घंटे में 1-2 टैबलेट',
    },
    precautions: {
      label: 'सावधानियां',
      content: '24 घंटों में 8 टैबलेट से अधिक न लें। लक्षण बने रहने पर डॉक्टर से सलाह लें।',
    },
    addToList: 'दवाओं की सूची में जोड़ें',
  },
  as: {
    title: 'পাৰাচিটামল 500mg',
    verified: 'প্ৰমাণিত',
    listen: 'শুনক',
    pause: 'ৰখক',
    description: {
      label: 'বিৱৰণ',
      content: 'দুখিয়া আৰহানি কৰা আৰু জ্বৰ কমোৱা ঔষধ।',
    },
    primaryUses: {
      label: 'প্ৰধান ব্যৱহাৰ',
      uses: ['দৰ্দ', 'জ্বৰ', 'শৰীৰ বিষ'],
    },
    dosage: {
      label: 'প্ৰয়োজনীয় মাত্ৰা',
      content: 'প্ৰয়োজন অনুসৰি প্ৰতি ৪-৬ ঘণ্টাত ৫০০mg-১০০০mg',
    },
    precautions: {
      label: 'সাৱধানতা',
      content: 'যকৃতৰ সমস্যাৰ বাবে চিকিৎসক পৰামৰ্শ লওক।',
    },
    addToList: 'ঔষধৰ তালিকাত যোগ কৰক',
  },
};

const i18n = new I18n(translations);

i18n.locale = Localization.getLocales()[0].languageCode;
i18n.fallbacks = true;

const SheetScreen = forwardRef(({ }, ref) => {
  const bottomSheetModalRef = useSheetRef();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const [loaded, error] = useFonts({
    OpenSans: require('../../assets/OpenSans.ttf'),
    Poppins: require('../../assets/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const openSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  useImperativeHandle(ref, () => ({
    openSheet,
  }));

  const toggleLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    i18n.locale = lang;
  };

  const speakContent = async () => {
    const content =
      i18n.t('title') +
      i18n.t('description.content') +
      ' ' +
      i18n.t('primaryUses.label') +
      ': ' +
      i18n.t('primaryUses.uses').join(', ') +
      '. ' +
      i18n.t('dosage.label') +
      ': ' +
      i18n.t('dosage.content') +
      '. ' +
      i18n.t('precautions.label') +
      ': ' +
      i18n.t('precautions.content');

    if (isSpeaking) {
      await Speech.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      try {
        await Speech.speak(content, {
          language: currentLanguage === 'en' ? 'en-US' : 'hi-IN',
          pitch: 1.0,
          rate: 0.8,
          onDone: () => setIsSpeaking(false),
          onError: () => setIsSpeaking(false),
        });
      } catch (error) {
        console.error('Speech error:', error);
        setIsSpeaking(false);
      }
    }
  };

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Sheet ref={bottomSheetModalRef} snapPoints={[200, 400, 600, 1000]}>
        <BottomSheetView className="w-full px-4 pb-10">
          <View className="rounded-2xl bg-card p-5 shadow-lg">
            <View className="relative mb-6 flex-col items-center justify-between">
              <View className="flex flex-col items-start">
                <Text
                  className="py-2 text-3xl font-medium text-foreground"
                  style={{ fontFamily: 'Poppins' }}>
                  {i18n.t('title')}
                </Text>
                <View className="rounded-full bg-emerald-500/10 px-3 py-1">
                  <Text
                    style={{ fontFamily: 'Poppins' }}
                    className="text-sm font-medium text-emerald-600">
                    {i18n.t('verified')}
                  </Text>
                </View>
              </View>

              <View className="mt-4 flex-row space-x-2">
                <TouchableOpacity
                  onPress={speakContent}
                  className={`rounded-full px-4 py-2 ${isSpeaking ? 'bg-violet-600' : 'bg-violet-100'}`}
                  style={{
                    elevation: 2,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                  }}>
                  <View className="h-6 w-6 items-center justify-center">
                    {isSpeaking ? (
                      <View className="flex flex-row items-center justify-center gap-2">
                        <Text className="text-lg text-white" style={{ fontFamily: 'Poppins' }}>
                          {i18n.t('pause')}
                        </Text>
                        <Text className="text-xl text-white">⏸️</Text>
                      </View>
                    ) : (
                      <View className="flex flex-row items-center justify-center gap-2">
                        <Text className="text-lg" style={{ fontFamily: 'Poppins' }}>
                          {i18n.t('listen')}
                        </Text>
                        <Text className="text-xl">🔊</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>

                <View className="ml-4 flex-row gap-2">
                  <TouchableOpacity
                    onPress={() => toggleLanguage('en')}
                    className={`flex items-center justify-center rounded-full px-3 py-1 ${currentLanguage === 'en' ? 'bg-blue-500' : 'bg-gray-200'}`}
                    style={{
                      elevation: 2,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.2,
                      shadowRadius: 2,
                    }}>
                    <Text
                      className={`text-sm ${currentLanguage === 'en' ? 'text-white' : 'text-gray-600'}`}
                      style={{ fontFamily: 'Poppins' }}>
                      ENG
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => toggleLanguage('hi')}
                    className={`flex items-center justify-center rounded-full px-3 py-1 ${currentLanguage === 'hi' ? 'bg-blue-500' : 'bg-gray-200'}`}
                    style={{
                      elevation: 2,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.2,
                      shadowRadius: 2,
                    }}>
                    <Text
                      className={`text-sm ${currentLanguage === 'hi' ? 'text-white' : 'text-gray-600'}`}
                      style={{ fontFamily: 'Poppins' }}>
                      हिंदी
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => toggleLanguage('as')}
                    className={`flex items-center justify-center rounded-full px-3 py-1 ${currentLanguage === 'as' ? 'bg-blue-500' : 'bg-gray-200'}`}
                    style={{
                      elevation: 2,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.2,
                      shadowRadius: 2,
                    }}>
                    <Text
                      className={`text-sm ${currentLanguage === 'as' ? 'text-white' : 'text-gray-600'}`}
                      style={{ fontFamily: 'Poppins' }}>
                      অসমীয়া
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="mb-6 h-48 w-full overflow-hidden rounded-xl bg-gray-100">
              <Image
                source={require('../../assets/medicine.jpg')}
                className="h-full w-full"
                resizeMode="cover"
              />
            </View>

            <View className="mb-5">
              <Text
                style={{ fontFamily: 'Poppins' }}
                className="text-foreground/50 mb-1 text-sm font-semibold">
                {i18n.t('description.label')}
              </Text>
              <Text
                style={{ fontFamily: 'Poppins' }}
                className="text-base leading-6 text-foreground">
                {i18n.t('description.content')}
              </Text>
            </View>

            <View className="mb-5">
              <Text
                className="text-foreground/70 mb-1 text-sm font-semibold"
                style={{ fontFamily: 'Poppins' }}>
                {i18n.t('primaryUses.label')}
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {i18n.t('primaryUses.uses').map((use) => (
                  <View key={use} className="rounded-full bg-violet-500/15 px-4 py-2">
                    <Text
                      style={{ fontFamily: 'Poppins' }}
                      className="text-sm font-medium text-violet-700 dark:text-violet-400">
                      {use}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View className="mb-3">
              <Text
                style={{ fontFamily: 'Poppins' }}
                className="text-foreground/70 mb-2 text-sm font-semibold">
                {i18n.t('dosage.label')}
              </Text>
              <View className="rounded-xl bg-blue-50 px-4 py-2 dark:bg-blue-900/20">
                <Text
                  style={{ fontFamily: 'Poppins' }}
                  className="text-base text-blue-800 dark:text-blue-300">
                  {i18n.t('dosage.content')}
                </Text>
              </View>
            </View>

            <View className="mb-4">
              <Text
                style={{ fontFamily: 'Poppins' }}
                className="text-foreground/70 mb-2 text-sm font-semibold">
                {i18n.t('precautions.label')}
              </Text>
              <View className="rounded-xl bg-amber-50 px-4 py-2 dark:bg-amber-900/20">
                <Text
                  style={{ fontFamily: 'Poppins' }}
                  className="text-base text-amber-800 dark:text-amber-300">
                  {i18n.t('precautions.content')}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              className="rounded-full bg-violet-600 p-4 shadow-sm active:opacity-80"
              onPress={() => { }}>
              <Text
                style={{ fontFamily: 'Poppins' }}
                className="text-center text-base font-semibold text-white">
                {i18n.t('addToList')}
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </Sheet>
    </>
  );
});

export default SheetScreen;
