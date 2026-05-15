import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronRight, LucideIcon } from 'lucide-react-native';

type ProfileSettingCardProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  onPress: () => void;
};

const ProfileSettingCard = ({ title, subtitle, icon: Icon, onPress }: ProfileSettingCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className="mb-4 flex-row items-center rounded-[24px] bg-white px-4 py-4"
      onPress={onPress}
      style={styles.settingsItemShadow}>
      <View className="h-[42px] w-[42px] items-center justify-center rounded-full bg-[#E3E7EA]">
        <Icon size={18} color="#006B9A" strokeWidth={2.3} />
      </View>

      <View className="ml-4 flex-1">
        <Text className="text-sm font-bold text-[#1A1A1C]">{title}</Text>

        <Text className="mt-1 text-xs leading-5 text-[#7C7C80]">{subtitle}</Text>
      </View>

      <ChevronRight size={18} color="#A1A1AA" strokeWidth={2.3} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  settingsItemShadow: {
    shadowColor: '#C7D5E0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 6,
  },
});

export default ProfileSettingCard;
