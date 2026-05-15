import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'Constants/Colors';
import CustomTextIput from 'components/Inputs/CustomTextIput';
import CustomButton from 'components/Buttons/CustomButton';

const SendOTPCard = () => {
  const [phone, setPhone] = useState('');
  const handlePhoneChange = (value: string) => {
    setPhone(value.replace(/\D/g, '').slice(0, 10));
  };
  const navigation = useNavigation();

  return (
    <View
      className="rounded-[32px] p-6 shadow-sm"
      style={{
        borderColor: '#F0E7E7',
        backgroundColor: '#FDFBFB',
        borderWidth: 1,
      }}>
      <Text className="mb-4 text-sm font-semibold" style={{ color: Colors.textBlack }}>
        Mobile Number
      </Text>

      <View
        className="h-14 flex-row items-center rounded-full bg-white px-4"
        style={{ borderColor: '#E5D6D6', borderWidth: 1 }}>
        <Text className="mr-3 text-sm" style={{ color: Colors.textBlack }}>
          +91
        </Text>

        <View className="mr-3 h-5 w-[1px]" style={{ backgroundColor: '#D9D9D9' }} />

        <CustomTextIput
          placeholder="Enter 10-digit mobile number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={handlePhoneChange}
          maxLength={10}
        />
      </View>

      <CustomButton
        title="Get OTP"
        containerClassName="mt-7"
        onPress={() => navigation.navigate('OTP')}
        
      />

      {/* <View className="my-7 flex-row items-center">
        <View className="h-[1px] flex-1" style={{ backgroundColor: '#ECECEC' }} />

        <Text className="mx-4 text-xs font-medium" style={{ color: '#A0A0A0' }}>
          OR ACCESS VIA
        </Text>

        <View className="h-[1px] flex-1" style={{ backgroundColor: '#ECECEC' }} />
      </View> */}

      {/* <View className="flex-row justify-between">
        <TouchableOpacity
          activeOpacity={0.8}
          className="mr-2 h-14 flex-1 flex-row items-center justify-center rounded-2xl"
          style={{
            borderColor: '#EEEEEE',
            backgroundColor: '#F7F7F7',
            borderWidth: 1,
          }}>
          <Ionicons name="finger-print-outline" size={18} color="#666666" />

          <Text className="ml-2 text-sm font-medium" style={{ color: Colors.textGray }}>
            Touch ID
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          className="ml-2 h-14 flex-1 flex-row items-center justify-center rounded-2xl"
          style={{
            borderColor: '#EEEEEE',
            backgroundColor: '#F7F7F7',
            borderWidth: 1,
          }}>
          <Ionicons name="scan-outline" size={18} color="#666666" />

          <Text className="ml-2 text-sm font-medium" style={{ color: Colors.textGray }}>
            Face ID
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default SendOTPCard;
