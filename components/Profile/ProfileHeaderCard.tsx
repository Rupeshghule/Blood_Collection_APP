import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Pencil } from 'lucide-react-native';

type ProfileHeaderCardProps = {
  name: string;
  patientId: string;
  bloodGroup: string;
  ageLabel: string;
  imageUri: string;
};

const ProfileHeaderCard = ({
  name,
  patientId,
  bloodGroup,
  ageLabel,
  imageUri,
}: ProfileHeaderCardProps) => {
  const [selectedImageUri, setSelectedImageUri] = useState(imageUri);

  useEffect(() => {
    setSelectedImageUri(imageUri);
  }, [imageUri]);

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission needed', 'Please allow gallery access to update your profile photo.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setSelectedImageUri(result.assets[0].uri);
    }
  };

  return (
    <View className="mx-4 mt-4 rounded-[28px] bg-white px-5 pb-6 pt-5" style={styles.cardShadow}>
      <View className="items-center">
        <View className="relative">
          <Image
            source={{
              uri: selectedImageUri,
            }}
            className="h-[78px] w-[78px] rounded-full"
          />

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handlePickImage}
            className="absolute bottom-0 right-0 h-7 w-7 items-center justify-center rounded-full bg-[#006B9A]">
            <Pencil size={14} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <Text className="mt-4 text-[26px] font-extrabold text-[#1B1B1D]">{name}</Text>

        <Text className="mt-1 text-[13px] text-[#7B7B7D]">Patient ID: {patientId}</Text>

        <View className="mt-5 flex-row">
          <View className="mr-3 flex-row items-center rounded-full bg-[#DFF5F4] px-4 py-2">
            <View className="mr-2 h-2.5 w-2.5 rounded-full bg-[#10B981]" />

            <Text className="text-[13px] font-semibold text-[#0F766E]">{bloodGroup}</Text>
          </View>

          <View className="flex-row items-center rounded-full bg-[#FFE5E5] px-4 py-2">
            <View className="mr-2 h-2.5 w-2.5 rounded-full bg-[#EF4444]" />

            <Text className="text-[13px] font-semibold text-[#DC2626]">{ageLabel}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#BFCEDB',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
});

export default ProfileHeaderCard;
