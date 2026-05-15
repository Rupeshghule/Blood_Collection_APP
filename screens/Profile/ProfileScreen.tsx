import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CircleHelp, Info, LogOut, Plus, Headset } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'Constants/Colors';
import CustomCircleButton from 'components/Buttons/CustomCircleButton';
import MemberCard from 'components/Profile/MemberCard';
import ProfileHeaderCard from 'components/Profile/ProfileHeaderCard';
import ProfileSettingCard from 'components/Profile/ProfileSettingCard';
import AddFamilyMemberModal from '../../modal/add member/AddFamilyMemberModal';
import AppGradientScreen from 'components/layout/AppGradientScreen';

type MemberHistoryItem = {
  id: string;
  test: string;
  date: string;
  status: string;
  amount: string;
};

type FamilyMember = {
  id: number;
  name: string;
  relation: string;
  blood: string;
  age: string;
  image: string;
  history: MemberHistoryItem[];
};

const initialFamilyMembers: FamilyMember[] = [
  {
    id: 1,
    name: 'Priya Verma',
    relation: 'Spouse',
    blood: 'A Positive',
    age: '31',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    history: [
      {
        id: 'priya-1',
        test: 'Thyroid Profile',
        date: '12 Mar 2026',
        status: 'Completed',
        amount: 'Rs. 1,450',
      },
      {
        id: 'priya-2',
        test: 'Vitamin D Test',
        date: '21 Jan 2026',
        status: 'Completed',
        amount: 'Rs. 1,100',
      },
    ],
  },
  {
    id: 2,
    name: 'Om Prakash',
    relation: 'Father',
    blood: 'O Negative',
    age: '63',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    history: [
      {
        id: 'om-1',
        test: 'Cardiac Risk Screening',
        date: '08 Apr 2026',
        status: 'Completed',
        amount: 'Rs. 1,999',
      },
    ],
  },
  {
    id: 3,
    name: 'Aryan Verma',
    relation: 'Son',
    blood: 'B Positive',
    age: '8',
    image: 'https://randomuser.me/api/portraits/boys/20.jpg',
    history: [
      {
        id: 'aryan-1',
        test: 'CBC Test',
        date: '15 Feb 2026',
        status: 'Completed',
        amount: 'Rs. 650',
      },
    ],
  },
];

const settings = [
  {
    id: 1,
    title: 'FAQ',
    subtitle: 'Common questions about bookings, reports, and support',
    icon: CircleHelp,
    screen: 'FAQScreen',
  },
  {
    id: 2,
    title: 'Support',
    subtitle: 'Help center and contact us',
    icon: Headset,
    screen: 'SupportScreen',
  },
  {
    id: 3,
    title: 'About Us',
    subtitle: 'Learn more about Hadapsar Labs',
    icon: Info,
    screen: 'AboutUsScreen',
  },
];

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const [familyMembers, setFamilyMembers] = useState(initialFamilyMembers);
  const [isAddMemberVisible, setIsAddMemberVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [relation, setRelation] = useState('');

  const handleCloseAddMemberModal = () => {
    setIsAddMemberVisible(false);
    setFullName('');
    setAge('');
    setBloodGroup('');
    setRelation('');
  };

  const handleSaveFamilyMember = () => {
    const nameValue = fullName.trim();
    const ageValue = age.trim();
    const bloodGroupValue = bloodGroup.trim();
    const relationValue = relation.trim();

    if (!nameValue || !ageValue || !bloodGroupValue || !relationValue) {
      return;
    }

    const newMember: FamilyMember = {
      id: Date.now(),
      name: nameValue,
      relation: relationValue,
      blood: bloodGroupValue,
      age: ageValue,
      image: 'https://randomuser.me/api/portraits/lego/1.jpg',
      history: [
        {
          id: `history-${Date.now()}`,
          test: 'No bookings yet',
          date: 'New Member',
          status: 'Pending',
          amount: 'Rs. 0',
        },
      ],
    };

    setFamilyMembers((currentMembers) => [newMember, ...currentMembers]);
    setIsAddMemberVisible(false);
    handleCloseAddMemberModal();
  };

  return (
    <AppGradientScreen>
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
                onPress={() => setIsAddMemberVisible(true)}
              />
            </View>

            {familyMembers.map((member) => (
              <MemberCard
                key={member.id}
                name={member.name}
                relation={member.relation}
                blood={member.blood}
                imageUri={member.image}
                onPress={() => navigation.navigate('MemberDetailsScreen', { member })}
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
                    onPress={() => navigation.navigate(item.screen)}
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

        <AddFamilyMemberModal
          modal={{
            visible: isAddMemberVisible,
            fullName,
            age,
            bloodGroup,
            relation,
            onChangeFullName: setFullName,
            onChangeAge: setAge,
            onChangeBloodGroup: setBloodGroup,
            onChangeRelation: setRelation,
            onClose: handleCloseAddMemberModal,
            onSave: handleSaveFamilyMember,
          }}
        />
    </AppGradientScreen>
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
