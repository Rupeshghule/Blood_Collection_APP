import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'Constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ArrowLeft, Pencil } from 'lucide-react-native';

import CustomButton from 'components/Buttons/CustomButton';
import CustomTextIput from 'components/Inputs/CustomTextIput';

type EditProfileParams = {
  profile?: {
    name: string;
    relation: string;
    bloodGroup: string;
    age: string;
    imageUri: string;
  };
};

const EditProfile = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { profile } = (route.params as EditProfileParams) ?? {};

  const initialProfile = profile ?? {
    name: 'Rajesh K. Verma',
    relation: 'Self',
    bloodGroup: 'B Positive',
    age: '34',
    imageUri: 'https://randomuser.me/api/portraits/men/36.jpg',
  };

  const [name, setName] = useState(initialProfile.name);
  const [relation, setRelation] = useState(initialProfile.relation);
  const [bloodGroup, setBloodGroup] = useState(initialProfile.bloodGroup);
  const [age, setAge] = useState(initialProfile.age);
  const [imageUri, setImageUri] = useState(initialProfile.imageUri);

  useEffect(() => {
    setName(initialProfile.name);
    setRelation(initialProfile.relation);
    setBloodGroup(initialProfile.bloodGroup);
    setAge(initialProfile.age);
    setImageUri(initialProfile.imageUri);
  }, [
    initialProfile.age,
    initialProfile.bloodGroup,
    initialProfile.imageUri,
    initialProfile.name,
    initialProfile.relation,
  ]);

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      ToastAndroid.show('Please allow gallery access to update profile photo.', ToastAndroid.SHORT);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    ToastAndroid.show('Profile updated successfully.', ToastAndroid.SHORT);
    navigation.goBack();
  };

  const isDisabled = !name.trim() || !relation.trim() || !bloodGroup.trim() || !age.trim();

  return (
    <LinearGradient
      colors={[Colors.redishBG, '#F8F7F8', '#EEF5FB']}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" backgroundColor={Colors.redishBG} />

        <View className="flex-row items-center justify-between px-4 pb-3 pt-2">
          <CustomButton
            title="Back"
            width="w-auto"
            height="h-auto"
            rounded="rounded-full"
            size="text-xs"
            backgroundColor={Colors.textWhite}
            textColor={Colors.textBlack}
            icon={<ArrowLeft size={16} color={Colors.textBlack} strokeWidth={2.4} />}
            iconPosition="left"
            iconSpacing="mr-2"
            className="px-4 py-3"
            buttonStyle={styles.headerButton}
            onPress={() => navigation.goBack()}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}>
          <View className="rounded-[28px] bg-white px-5 py-5" style={styles.cardShadow}>
            <Text className="text-xl font-extrabold" style={{ color: Colors.textBlack }}>
              Edit Profile
            </Text>
            <Text className="mt-1 text-sm leading-6" style={{ color: Colors.textGray }}>
              Update profile picture and personal details for this member.
            </Text>

            <View className="mt-6 items-center">
              <TouchableOpacity className="relative" onPress={handlePickImage}>
                <Image source={{ uri: imageUri }} className="h-[92px] w-[92px] rounded-full" />
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={handlePickImage}
                  className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full"
                  style={{ backgroundColor: Colors.textBlue }}>
                  <Pencil size={15} color={Colors.textWhite} strokeWidth={2.5} />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>

            <View className="mt-6">
              <Text className="mb-2 text-sm font-bold" style={{ color: Colors.textBlack }}>
                Full Name
              </Text>
              <View className="rounded-[18px] bg-white px-4 py-1" style={styles.inputCard}>
                <CustomTextIput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter full name"
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View className="mt-4">
              <Text className="mb-2 text-sm font-bold" style={{ color: Colors.textBlack }}>
                Relation
              </Text>
              <View className="rounded-[18px] bg-white px-4 py-1" style={styles.inputCard}>
                <CustomTextIput
                  value={relation}
                  onChangeText={setRelation}
                  placeholder="Ex. Self, Mother, Father"
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View className="mt-4 flex-row justify-between">
              <View className="w-[48%]">
                <Text className="mb-2 text-sm font-bold" style={{ color: Colors.textBlack }}>
                  Blood Group
                </Text>
                <View className="rounded-[18px] bg-white px-4 py-1" style={styles.inputCard}>
                  <CustomTextIput
                    value={bloodGroup}
                    onChangeText={setBloodGroup}
                    placeholder="Ex. B+"
                    autoCapitalize="characters"
                  />
                </View>
              </View>

              <View className="w-[48%]">
                <Text className="mb-2 text-sm font-bold" style={{ color: Colors.textBlack }}>
                  Age
                </Text>
                <View className="rounded-[18px] bg-white px-4 py-1" style={styles.inputCard}>
                  <CustomTextIput
                    value={age}
                    onChangeText={setAge}
                    placeholder="Enter age"
                    keyboardType="number-pad"
                  />
                </View>
              </View>
            </View>

            <CustomButton
              title="Save Changes"
              containerClassName="mt-6"
              backgroundColor={Colors.textBlue}
              textColor={Colors.textWhite}
              height="h-14"
              rounded="rounded-[22px]"
              size="text-base"
              onPress={handleSave}
              disabled={isDisabled}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  headerButton: {
    shadowColor: Colors.blueShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  cardShadow: {
    shadowColor: Colors.blueShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  inputCard: {
    borderWidth: 1,
    borderColor: Colors.chipBorder,
    shadowColor: Colors.blueShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
});
