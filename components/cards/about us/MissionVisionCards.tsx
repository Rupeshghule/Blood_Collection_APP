import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Eye, Flag } from 'lucide-react-native';
import { Colors } from 'Constants/Colors';

const cards = [
  {
    title: 'Mission',
    subtitle: 'Reliable diagnostics at your doorstep.',
    points: ['Hygienic home collection', 'Accurate reports without long waits'],
    color: Colors.textRed,
    icon: Flag,
    tint: '#FFF1F3',
  },
  {
    title: 'Vision',
    subtitle: 'Simple and trusted care for every family.',
    points: ['Expand quality access locally', 'Use technology for smoother service'],
    color: Colors.textBlue,
    icon: Eye,
    tint: '#F2F8FC',
  },
];

export default function MissionVisionCards() {
  return (
    <View className="w-full max-w-[360px] py-5">
      <View className="items-center">
        <Text className="text-[24px] font-extrabold" style={{ color: Colors.textBlack }}>
          Mission & Vision
        </Text>

        <Text
          className="mt-2 text-center text-[14px] leading-6"
          style={{ color: Colors.textGray }}>
          Short, clear goals that guide how we serve patients every day.
        </Text>
      </View>

      <View className="mt-5">
        {cards.map((item) => {
          const Icon = item.icon;

          return (
            <View key={item.title} style={styles.card}>
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pr-3">
                  <View className="flex-row items-center">
                    <View style={[styles.iconWrap, { backgroundColor: item.tint }]}>
                      <Icon size={18} color={item.color} strokeWidth={2.4} />
                    </View>

                    <Text className="ml-3 text-[18px] font-bold" style={{ color: Colors.textBlack }}>
                      {item.title}
                    </Text>
                  </View>

                  <Text
                    className="mt-3 text-[13px] leading-5"
                    style={{ color: Colors.textGray }}>
                    {item.subtitle}
                  </Text>
                </View>

                <View style={[styles.accentPill, { backgroundColor: item.color }]} />
              </View>

              <View className="mt-4">
                {item.points.map((point) => (
                  <View key={point} className="mb-2 flex-row items-center">
                    <View style={[styles.dot, { backgroundColor: item.color }]} />

                    <Text className="ml-3 flex-1 text-[13px]" style={{ color: Colors.textBlack }}>
                      {point}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
    borderRadius: 24,
    backgroundColor: Colors.textWhite,
    paddingHorizontal: 18,
    paddingVertical: 18,
    shadowColor: Colors.textBlack,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  iconWrap: {
    height: 38,
    width: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
  },
  accentPill: {
    height: 10,
    width: 10,
    marginTop: 4,
    borderRadius: 999,
  },
  dot: {
    height: 7,
    width: 7,
    borderRadius: 999,
  },
});
