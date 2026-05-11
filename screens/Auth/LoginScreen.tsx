import React from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../Constants/Colors';
import SendOTPCard from 'components/cards/Login/SendOTPCard';

const LoginScreen = () => {
  return (
    <LinearGradient
      colors={[Colors.redishBG, '#F6E9EA', '#F6F5F6', '#FFFFFF']}
      locations={[0, 0.24, 0.62, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" backgroundColor={Colors.redishBG} />

        <View className="flex-1 justify-center px-6">
          <View className="mb-10 items-center">
            <Image
              source={require('../../assets/Logo.png')}
              resizeMode="contain"
              style={{ width: 200, height: 200 }}
            />

            <Text
              className="mt-2 text-center text-[34px] font-extrabold leading-[40px]"
              style={{ color: Colors.textBlack }}>
              Welcome to Hadapsar Labs
            </Text>

            <Text
              className=" px-5 text-center text-[15px] leading-6"
              style={{ color: Colors.textGray }}>
              Your trusted partner in home health collection
            </Text>
          </View>
          <SendOTPCard />

          <View className="mt-10 items-center">
            <Text className="text-[13px]" style={{ color: '#8A8A8A' }}>
              {"Don't have an account?"}{' '}
              <Text className="font-semibold" style={{ color: '#0E8AD9' }}>
                Register Account
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
