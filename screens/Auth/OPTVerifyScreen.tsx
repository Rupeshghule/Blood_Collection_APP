import React from 'react';
import { View, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import VerifyOTPCard from 'components/cards/OTP/VerifyOTPCard';
import { Colors } from 'Constants/Colors';

const OPTVerifyScreen = () => {
  return (
    <LinearGradient
      colors={[Colors.redishBG, '#F8F7F8', '#EEF5FB']}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" backgroundColor={Colors.redishBG} />

        <View className="absolute inset-0 items-center justify-center">
          <Image
            source={require('../../assets/logoCroppped.png')}
            resizeMode="contain"
            style={{ width: 400, height: 400, opacity: 0.1 }}
          />
        </View>

        <View className="flex-1 items-center justify-center px-6">
          <VerifyOTPCard />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OPTVerifyScreen;
