import { View, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'Constants/Colors';
import CustomButton from 'components/Buttons/CustomButton';
import { House, SquarePlus } from 'lucide-react-native';

const HomeBookTestCard = () => {
  return (
    <View
      style={{
        borderRadius: 24,
        backgroundColor: '#005E89',
        shadowColor: '#005E89',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.14,
        shadowRadius: 20,
        elevation: 8,
      }}>
      <LinearGradient
        colors={['#005E89', '#0E7CB5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="overflow-hidden rounded-3xl p-5">
        <View
          pointerEvents="none"
          className="absolute left-5 right-5 top-0 h-[1px]"
          style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}
        />
        <View className="flex-row items-center gap-2">
          <House color={Colors.textWhite} size={24} strokeWidth={2.3} />
          <Text className="text-[24px] font-bold " style={{ color: Colors.textWhite }}>
            Book Home Visit
          </Text>
        </View>

        <Text className="mt-2 text-[13px] leading-5 " style={{ color: Colors.textWhite }}>
          Samples collected from your doorstep
        </Text>

        <CustomButton
          title="Schedule Collection"
          className="mt-5 self-start"
          width="w-auto"
          height="h-12"
          rounded="rounded-full"
          size="text-[13px]"
          backgroundColor={Colors.textWhite}
          borderColor="rgba(255,255,255,0.75)"
          textColor="#005E89"
          buttonStyle={{
            paddingHorizontal: 20,
          }}
        />

        <View className="absolute bottom-0 right-0 opacity-20">
          <SquarePlus size={80} color="#fff" strokeWidth={1.8} />
        </View>
      </LinearGradient>
    </View>
  );
};

export default HomeBookTestCard;
