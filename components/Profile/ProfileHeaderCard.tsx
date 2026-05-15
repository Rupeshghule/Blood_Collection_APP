import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pencil } from 'lucide-react-native';
import { Colors } from 'Constants/Colors';

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
  const navigation = useNavigation<any>();
  const [selectedImageUri, setSelectedImageUri] = useState(imageUri);

  useEffect(() => {
    setSelectedImageUri(imageUri);
  }, [imageUri]);


  return (
    <View className="mx-4 mt-4 rounded-[28px] bg-white px-5 pb-6 pt-5" style={styles.cardShadow}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('EditProfile', {
            profile: {
              name,
              relation: 'Self',
              bloodGroup,
              age: ageLabel.replace(/\s*Years?$/i, ''),
              imageUri: selectedImageUri,
            },
          })
        }
        className="absolute right-4 top-4 z-10 h-9 w-9 items-center justify-center rounded-full"
        style={{ backgroundColor: Colors.textBlue }}>
        <Pencil size={14} color={Colors.textWhite} strokeWidth={2.4} />
      </TouchableOpacity>

      <View className="items-center">
        <View className="relative">
          <Image
            source={{
              uri: selectedImageUri,
            }}
            className="h-[78px] w-[78px] rounded-full"
          />
        </View>

        <Text
          className="mt-4 text-center text-2xl font-extrabold"
          style={{ color: Colors.textBlack }}>
          {name}
        </Text>

        <Text className="mt-1 text-center text-sm" style={{ color: Colors.textGray }}>
          Patient ID: {patientId}
        </Text>

        <View className="mt-5 flex-row items-center justify-center">
          <View
            className="mr-3 flex-row items-center rounded-full px-4 py-2"
            style={{ backgroundColor: Colors.blueshBG }}>
            <View
              className="mr-2 h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: Colors.textBlue }}
            />

            <Text className="text-sm font-semibold" style={{ color: Colors.textBlue }}>
              {bloodGroup}
            </Text>
          </View>

          <View
            className="flex-row items-center rounded-full px-4 py-2"
            style={{ backgroundColor: Colors.redishBG }}>
            <View
              className="mr-2 h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: Colors.textRed }}
            />

            <Text className="text-sm font-semibold" style={{ color: Colors.textRed }}>
              {ageLabel}
            </Text>
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
