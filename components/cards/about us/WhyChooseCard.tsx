import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ShieldCheck, Syringe, ShieldPlus, House, Gauge, BadgeCheck } from 'lucide-react-native';
import { Colors } from 'Constants/Colors';

const features = [
  {
    title: 'Certified Professional',
    desc: 'Operated by B.Sc MLT certified experts ensuring clinical-grade accuracy in every test.',
    icon: ShieldCheck,
    bg: '#ffecee',
    color: '#d92d3a',
  },
  {
    title: 'Painless Collection',
    desc: 'Specialized vacuum collection techniques ensure a virtually painless experience.',
    icon: Syringe,
    bg: '#eef1ff',
    color: '#5b6dd8',
  },
  {
    title: 'Hygiene Standards',
    desc: 'International sterilization protocols and disposable collection kits for every visit.',
    icon: ShieldPlus,
    bg: '#ffecee',
    color: '#d92d3a',
  },
  {
    title: 'Home Visit Service',
    desc: 'Premium blood collection services in the comfort of your home at your convenience.',
    icon: House,
    bg: '#eef1ff',
    color: '#5b6dd8',
  },
  {
    title: 'Fast Reporting',
    desc: 'Digital reports delivered within hours through our integrated patient portal.',
    icon: Gauge,
    bg: '#ffecee',
    color: '#d92d3a',
  },
  {
    title: 'Patient Trust',
    desc: 'Trusted by families through transparent pricing and compassionate healthcare.',
    icon: BadgeCheck,
    bg: '#eef1ff',
    color: '#5b6dd8',
  },
];

export default function WhyChooseCard() {
  return (
    <ScrollView className="flex-1 px-4 pt-6">
      <View className="flex-row flex-wrap justify-between">
        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <View
              key={index}
              className="mb-4 w-[48%] rounded-[24px] bg-white p-4"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 10,
                elevation: 3,
              }}>
              {/* Icon */}
              <View
                className="mb-2 h-8 w-8 items-center justify-center rounded-2xl"
                style={{ backgroundColor: item.bg }}>
                <Icon size={16} color={item.color} />
              </View>

              {/* Title */}
              <Text className="text-md font-extrabold  " style={{ color: Colors.textBlue }}>
                {item.title}
              </Text>

              {/* Description */}
              <Text className="mt-2 text-sm font-medium leading-6 text-[#7a7a7a]">{item.desc}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
