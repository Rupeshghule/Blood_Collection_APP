import { StatusBar, ScrollView, View, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'Constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import InfoCard from 'components/cards/about us/InfoCard';
import WhyChooseCard from 'components/cards/about us/WhyChooseCard';
import StatsCard from 'components/cards/about us/StatsCard';
import ServiceCoverage from 'components/cards/about us/ServiceCoverage';
import MissionVisionCards from 'components/cards/about us/MissionVisionCards';
import ContactCard from 'components/cards/about us/ContactCard';
import ChooseUsCard from 'components/cards/about us/chooseUsCard';

const AboutUsScreen = () => {
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
            paddingHorizontal: 16,
            paddingTop: 20,
            paddingBottom: 32,
            alignItems: 'center',
          }}>
          <InfoCard />
          <View className="mt-4 items-center">
            <Text className="text-2xl font-extrabold " style={{ color: Colors.textBlack }}>
              Why Choose Pannu Bhaware ?
            </Text>

            <View className="mt-2 h-[4px] w-[52px] rounded-full bg-[#d61f2c]" />
          </View>
          <WhyChooseCard />
          {/* <ChooseUsCard/> */}
          {/* <StatsCard /> */}
          <MissionVisionCards />
          <ServiceCoverage />
          <ContactCard />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AboutUsScreen;
