import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BadgeCheck, HeartHandshake, ShieldCheck, House, Gauge, Users } from 'lucide-react-native';
import { Colors } from 'Constants/Colors';

const features = [
  {
    title: 'Certified Professional',
    desc: 'Fully qualified B.Sc. MLT with proper certification and continuous training.',
    icon: BadgeCheck,
  },
  {
    title: 'Painless Collection',
    desc: 'Specialized technique for comfortable, painless blood collection experience.',
    icon: HeartHandshake,
  },
  {
    title: 'Hygiene Standards',
    desc: 'Strict adherence to sterilization and hygiene protocols at all times.',
    icon: ShieldCheck,
  },
  {
    title: 'Home Visit Service',
    desc: 'Convenient home collection service for elderly and busy professionals.',
    icon: House,
  },
  {
    title: 'Fast Reporting',
    desc: 'Quick turnaround time with digital reports via WhatsApp for convenience.',
    icon: Gauge,
  },
  {
    title: 'Patient Trust',
    desc: 'Trusted by thousands of patients across Hadapsar and nearby areas.',
    icon: Users,
  },
];

const ChooseUsCard = () => {
  return (
    <View className="px-4 py-6">
      <View className="flex-row flex-wrap justify-between">
        {features.map((item, index) => {
          const Icon = item.icon;
          const isBlueAccent = index % 2 === 1;

          return (
            <View key={item.title} className="mb-4 w-[48%] rounded-[24px] bg-white p-4" style={styles.card}>
              <View
                className="mb-3 h-[42px] w-[42px] items-center justify-center rounded-full"
                style={{
                  backgroundColor: isBlueAccent ? Colors.blueshBG : Colors.redishBG,
                }}>
                <Icon
                  size={18}
                  color={isBlueAccent ? Colors.textBlue : Colors.textRed}
                  strokeWidth={2.3}
                />
              </View>

              <Text className="text-sm font-bold" style={{ color: Colors.textBlack }}>
                {item.title}
              </Text>

              <Text className="mt-2 text-xs leading-5" style={{ color: Colors.textGray }}>
                {item.desc}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#C7D5E0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 6,
  },
});

export default ChooseUsCard;
