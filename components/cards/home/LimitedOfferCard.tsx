import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'Constants/Colors';

const LimitedOfferCard = () => {
  return (
    <View className="mt-5 px-4">
      <View
        style={{
          borderRadius: 24,
          backgroundColor: Colors.blueShadow,
          shadowColor: Colors.blueShadow,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 18,
          elevation: 8,
        }}>
        <LinearGradient
          colors={[Colors.blueShadow, '#1B9BC7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="min-h-[180px] justify-between overflow-hidden rounded-3xl p-5">
          <View className="pr-14">
            <View className="self-start rounded-full bg-[#FF5B5B] px-3 py-1">
              <Text className="text-xs font-bold" style={{ color: Colors.textWhite }}>
                LIMITED OFFER
              </Text>
            </View>

            <Text className="mt-3 text-2xl font-extrabold" style={{ color: Colors.textWhite }}>
              Ultra Premium Comprehensive
            </Text>

            <Text className="mt-1 text-3xl font-extrabold" style={{ color: Colors.textWhite }}>
              50% Off
            </Text>

            <Text className="mt-2 text-sm leading-5" style={{ color: Colors.textWhite }}>
              Our most complete annual health review - 110+ parameters across all major systems.
              Designed for HNI and CXO clients in Amanora and Magarpatta.
            </Text>
          </View>

          <TouchableOpacity className="mt-5 self-start rounded-full bg-white px-5 py-3">
            <Text className="text-[13px] font-bold " style={{ color: Colors.blueShadow }}>
              Book Now
            </Text>
          </TouchableOpacity>

          <View className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10" />
          <View className="absolute bottom-5 right-8 h-16 w-16 rounded-2xl border-4 border-white/10" />
        </LinearGradient>
      </View>
    </View>
  );
};

export default LimitedOfferCard;
