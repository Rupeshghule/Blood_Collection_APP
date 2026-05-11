import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CustomButton from 'components/Buttons/CustomButton';
import CustomTextIput from 'components/Inputs/CustomTextIput';
import { Colors } from 'Constants/Colors';

const OTP_LENGTH = 4;

const VerifyOTPCard = () => {
  const [otp, setOtp] = useState(Array.from({ length: OTP_LENGTH }, () => ''));
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const navigation = useNavigation();

  const handleChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.replace(/\D/g, '').slice(-1);
    setOtp(updatedOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <View className="w-full overflow-hidden rounded-[32px] px-7 py-10" style={styles.card}>
      <View pointerEvents="none" style={styles.topGlow} />
      <View pointerEvents="none" style={styles.sideGlow} />
      <View pointerEvents="none" style={styles.glossHighlight} />

      <Text className="text-center text-[13px] leading-6" style={{ color: Colors.textGray }}>
        Enter the 4-digit code sent to your
      </Text>

      <Text
        className="mt-1 text-center text-[13px] font-semibold"
        style={{ color: Colors.textGray }}>
        mobile number
      </Text>

      <View className="mt-8 flex-row justify-between">
        {otp.map((digit, index) => (
          <CustomTextIput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            textClassName="h-14 w-14 rounded-2xl text-center text-[22px]"
            textStyle={{ color: '#222222' }}
            style={styles.otpInput}
          />
        ))}
      </View>

      <CustomButton
        title="Verify & Continue"
        containerClassName="mt-8"
        buttonStyle={styles.buttonShadow}
        onPress={() => navigation.navigate('DrawerNavigator', { screen: 'Tabs' })}
      />

      <View className="mt-7 flex-row justify-center">
        <Text className="text-[12px]" style={{ color: Colors.textGray }}>
          {" Didn't receive the code?"}
        </Text>

        <TouchableOpacity activeOpacity={0.7}>
          <Text className="ml-1 text-[12px] font-semibold text-[#D75D73]">Resend OTP</Text>
        </TouchableOpacity>
      </View>

      <Text className="mt-6 text-center text-[12px]" style={{ color: Colors.textGray }}>
        Wait for 00:59
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.42)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.72)',
    shadowColor: '#B7C6D8',
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 12,
  },
  topGlow: {
    position: 'absolute',
    top: -18,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.42)',
  },
  sideGlow: {
    position: 'absolute',
    right: -30,
    top: 90,
    width: 120,
    height: 180,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  glossHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  otpInput: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderWidth: 1,
    borderColor: 'rgba(216,199,203,0.9)',
  },
  buttonShadow: {
    shadowColor: '#82BFE8',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 8,
  },
});

export default VerifyOTPCard;
