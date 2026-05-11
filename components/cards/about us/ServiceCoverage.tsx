import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { Colors } from 'Constants/Colors';

const locations = [
  {
    title: 'Amanora',
    subtitle: 'Premium home visits with fast doorstep collection.',
    color: Colors.textRed,
  },
  {
    title: 'Magarpatta',
    subtitle: 'Corporate and residential sample pickup support.',
    color: Colors.textBlue,
  },
  {
    title: 'Hadapsar',
    subtitle: 'Central service hub for surrounding communities.',
    color: Colors.textRed,
  },
];

export default function ServiceCoverage() {
  return (
    <View className="w-full max-w-[360px] pt-6">
      <View className="">
        <Text className="text-[24px] font-extrabold" style={{ color: Colors.textBlack }}>
          Service Coverage
        </Text>

        <Text className="text-md" style={{ color: Colors.textGray }}>
          We bring health services home across our primary service areas.
        </Text>
      </View>

      <View className="mt-5">
        {locations.map((item) => (
          <View key={item.title} style={styles.card}>
            <View style={[styles.accentBar, { backgroundColor: item.color }]} />

            <View
              className="mr-4 h-[45px] w-[45px] items-center justify-center rounded-full"
              style={styles.iconWrap}>
              <MapPin size={24} color={item.color} strokeWidth={2.3} />
            </View>

            <View className="flex-1">
              <Text className="text-[18px] font-bold" style={{ color: Colors.textBlack }}>
                {item.title}
              </Text>

              <Text className="mt-1 text-[13px] leading-5" style={{ color: Colors.textGray }}>
                {item.subtitle}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: Colors.textWhite,
    paddingVertical: 12,
    paddingLeft: 20,
    paddingRight: 18,
    shadowColor: Colors.textBlack,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 3,
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 14,
    bottom: 14,
    width: 6,
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
  },
  iconWrap: {
    backgroundColor: Colors.blueshBG,
  },
});
