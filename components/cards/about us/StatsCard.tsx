import { Colors } from 'Constants/Colors';
import React from 'react';
import { View, Text } from 'react-native';

export default function StatsCard() {
  const stats = [
    {
      value: '3+',
      label: 'YEARS\nEXPERIENCE',
      color: Colors.textRed,
    },
    {
      value: '5k+',
      label: 'SATISFIED\nPATIENTS',
      color: Colors.textBlue,
    },
    {
      value: '1000+',
      label: 'TYPES OF TESTS',
      color: Colors.textRed,
    },
    {
      value: '20km',
      label: 'COVERAGE AREA',
      color: Colors.textBlue,
    },
  ];

  return (
    <View className="mx-4 rounded-[28px] p-7" style={{ backgroundColor: Colors.blueshBG }}>
      <View className="flex-row flex-wrap">
        {stats.map((item, index) => (
          <View key={index} className="mb-7 w-1/2 items-center">
            {/* Value */}
            <Text className="text-[38px] font-extrabold" style={{ color: item.color }}>
              {item.value}
            </Text>

            {/* Label */}
            <Text
              className="mt-1 text-center text-sm font-extrabold leading-4 tracking-[1.5px] "
              style={{ color: Colors.textGray }}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
