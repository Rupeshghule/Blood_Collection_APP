import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from 'Constants/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from 'components/Buttons/CustomButton';
import { ArrowLeft } from 'lucide-react-native';
import MemberSummaryCard, { type FamilyMember } from 'components/Profile/MemberSummaryCard';
import AppGradientScreen from 'components/layout/AppGradientScreen';

type RouteParams = {
  member?: FamilyMember;
};

const MemberDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { member } = (route.params as RouteParams) ?? {};

  const fallbackMember: FamilyMember = {
    id: 0,
    name: 'Family Member',
    relation: 'Relation',
    blood: 'Not set',
    age: 'Not set',
    image: 'https://randomuser.me/api/portraits/lego/1.jpg',
    history: [],
  };

  const details = member ?? fallbackMember;

  return (
    <AppGradientScreen>
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
          <MemberSummaryCard
            member={details}
            onEdit={() =>
              navigation.navigate('EditProfile', {
                profile: {
                  name: details.name,
                  relation: details.relation,
                  bloodGroup: details.blood,
                  age: details.age,
                  imageUri: details.image,
                },
              })
            }
          />

          <View className="mt-7">
            <Text className="text-xl font-extrabold" style={{ color: Colors.textBlack }}>
              Test History
            </Text>
            <Text className="mt-1 text-sm" style={{ color: Colors.textGray }}>
              Previous tests and bookings for this family member
            </Text>

            <View className="mt-4">
              {details.history.length ? (
                details.history.map((historyItem) => (
                  <View
                    key={historyItem.id}
                    className="mb-3 rounded-[22px] bg-white px-4 py-4"
                    style={{
                      shadowColor: Colors.blueShadow,
                      shadowOffset: { width: 0, height: 6 },
                      shadowOpacity: 0.06,
                      shadowRadius: 10,
                      elevation: 3,
                    }}>
                    <View className="flex-row items-center justify-between">
                      <Text
                        className="flex-1 pr-3 text-sm font-bold"
                        style={{ color: Colors.textBlack }}>
                        {historyItem.test}
                      </Text>
                      <View
                        className="rounded-full px-3 py-1"
                        style={{ backgroundColor: Colors.redishBG }}>
                        <Text className="text-xs font-bold" style={{ color: Colors.textRed }}>
                          {historyItem.status}
                        </Text>
                      </View>
                    </View>

                    <Text className="mt-2 text-sm" style={{ color: Colors.textGray }}>
                      {historyItem.date}
                    </Text>

                    <Text className="mt-2 text-sm font-bold" style={{ color: Colors.textBlue }}>
                      {historyItem.amount}
                    </Text>
                  </View>
                ))
              ) : (
                <View className="rounded-[22px] bg-white px-4 py-5">
                  <Text className="text-sm" style={{ color: Colors.textGray }}>
                    No history available yet for this member.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
    </AppGradientScreen>
  );
};

export default MemberDetailsScreen;

const styles = StyleSheet.create({
  headerButton: {
    shadowColor: Colors.blueShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
});
