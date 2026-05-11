import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock3, CircleHelp, Info, LogOut, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'Constants/Colors';
import CustomCircleButton from 'components/Buttons/CustomCircleButton';
import MemberCard from 'components/Profile/MemberCard';
import ProfileHeaderCard from 'components/Profile/ProfileHeaderCard';
import ProfileSettingCard from 'components/Profile/ProfileSettingCard';

const familyMembers = [
  {
    id: 1,
    name: 'Priya Verma',
    relation: 'Spouse',
    blood: 'A Positive',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Om Prakash',
    relation: 'Father',
    blood: 'O Negative',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Aryan Verma',
    relation: 'Son',
    blood: 'B Positive',
    image: 'https://randomuser.me/api/portraits/boys/20.jpg',
  },
];

const settings = [
  {
    id: 1,
    title: 'Booking History',
    subtitle: 'View your past laboratory visits',
    icon: Clock3,
  },
  {
    id: 2,
    title: 'Support',
    subtitle: 'Help center and contact us',
    icon: CircleHelp,
  },
  {
    id: 3,
    title: 'About Us',
    subtitle: 'Learn more about Hadapsar Labs',
    icon: Info,
  },
];

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={[Colors.redishBG, '#F6E9EA', '#F6F5F6', '#FFFFFF']}
      locations={[0, 0.24, 0.62, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" backgroundColor={Colors.redishBG} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}>
          <ProfileHeaderCard
            name="Rajesh K. Verma"
            patientId="#BL-88291"
            bloodGroup="B Positive"
            ageLabel="34 Years"
            imageUri="https://randomuser.me/api/portraits/men/36.jpg"
          />

          <View className="mx-4 mt-7">
            <View className="mb-4 flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-xl font-extrabold " style={{ color: Colors.textBlack }}>
                  Family Members
                </Text>

                <Text className="text-md" style={{ color: Colors.textGray }}>
                  Manage health records for your loved ones
                </Text>
              </View>

              <CustomCircleButton
                icon={<Plus size={20} color={Colors.textWhite} strokeWidth={2.5} />}
                title={`Add${'\n'}New`}
              />
            </View>

            {familyMembers.map((member) => (
              <MemberCard
                key={member.id}
                name={member.name}
                relation={member.relation}
                blood={member.blood}
                imageUri={member.image}
              />
            ))}
          </View>

          <View className="mx-4 mt-3">
            <Text className="mb-4 text-xl font-extrabold " style={{ color: Colors.textBlack }}>
              Account Settings
            </Text>

            <View>
              {settings.map((item, index) => {
                return (
                  <ProfileSettingCard
                    key={item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                    icon={item.icon}
                    onPress={() => {
                      if (item.id === 3) {
                        navigation.navigate('AboutUsScreen');
                      }
                    }}
                  />
                );
              })}

              <TouchableOpacity
                activeOpacity={0.85}
                className="flex-row items-center rounded-[24px] bg-white px-4 py-2"
                style={[styles.settingsItemShadow, styles.buttonbg]}>
                <View className="h-[42px] w-[42px] items-center justify-center rounded-full bg-[#FFE9E9]">
                  <LogOut size={18} color="#EF4444" strokeWidth={2.3} />
                </View>

                <View className="ml-4 flex-1">
                  <Text className="text-md font-bold" style={{ color: Colors.textRed }}>
                    Logout
                  </Text>

                  <Text className="mt-1 text-sm" style={{ color: Colors.textGray }}>
                    Sign out of your account
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  settingsCardShadow: {
    shadowColor: '#C7D5E0',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 7,
  },
  settingsItemShadow: {
    shadowColor: '#C7D5E0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 6,
  },
  buttonbg: {
    backgroundColor: `${Colors.textRed}30`,
  },
});

export default ProfileScreen;
