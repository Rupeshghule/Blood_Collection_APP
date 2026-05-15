import { ScrollView, View, Text } from 'react-native';
import React from 'react';
import { Colors } from 'Constants/Colors';
import InfoCard from 'components/cards/about us/InfoCard';
import WhyChooseCard from 'components/cards/about us/WhyChooseCard';
import ServiceCoverage from 'components/cards/about us/ServiceCoverage';
import MissionVisionCards from 'components/cards/about us/MissionVisionCards';
import ContactCard from 'components/cards/about us/ContactCard';
import AppGradientScreen from 'components/layout/AppGradientScreen';

const AboutUsScreen = () => {
  return (
    <AppGradientScreen>
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
    </AppGradientScreen>
  );
};

export default AboutUsScreen;
