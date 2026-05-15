import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'Constants/Colors';

const LimitedOfferCard = () => {
  return (
    <View className="mt-5 px-4">
      <View
        style={{
          borderRadius: 20,
          backgroundColor: Colors.blueShadow,
          shadowColor: Colors.blueShadow,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.09,
          shadowRadius: 14,
          elevation: 6,
        }}>
        <LinearGradient
          colors={[Colors.blueShadow, '#1B9BC7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="min-h-[152px] justify-between overflow-hidden rounded-[20px] p-4">
          <View className="pr-12">
            <View className="self-start rounded-full bg-[#FF5B5B] px-2.5 py-1">
              <Text className="text-xs font-bold" style={{ color: Colors.textWhite }}>
                LIMITED OFFER
              </Text>
            </View>

            <Text className="mt-2.5 text-xl font-extrabold" style={{ color: Colors.textWhite }}>
              Ultra Premium Comprehensive
            </Text>

            <Text className="mt-0.5 text-2xl font-extrabold" style={{ color: Colors.textWhite }}>
              50% Off
            </Text>

            <Text className="mt-1.5 text-xs leading-4" style={{ color: Colors.textWhite }}>
              Our most complete annual health review - 110+ parameters across all major systems.
              Designed for HNI and CXO clients in Amanora and Magarpatta.
            </Text>
          </View>

          <TouchableOpacity className="mt-4 self-start rounded-full bg-white px-4 py-2.5">
            <Text className="text-xs font-bold " style={{ color: Colors.blueShadow }}>
              Book Now
            </Text>
          </TouchableOpacity>

          <View className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/10" />
          <View className="absolute bottom-4 right-6 h-12 w-12 rounded-2xl border-4 border-white/10" />
        </LinearGradient>
      </View>
    </View>
  );
};

export default LimitedOfferCard;
