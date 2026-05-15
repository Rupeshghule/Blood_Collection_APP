import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

import { Colors } from 'Constants/Colors';

type MemberCardProps = {
  name: string;
  relation: string;
  blood: string;
  imageUri: string;
  onPress?: () => void;
};

const MemberCard = ({ name, relation, blood, imageUri, onPress }: MemberCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="mb-4 flex-row items-center rounded-3xl bg-white px-4 py-4"
      style={styles.memberCardShadow}>
      <Image source={{ uri: imageUri }} className="h-[50px] w-[50px] rounded-full" />

      <View className="ml-4 flex-1">
        <Text className="text-base font-bold" style={{ color: Colors.textBlue }}>
          {name}
        </Text>

        <Text className="mt-1 text-sm" style={{ color: Colors.textGray }}>
          {relation} | {blood}
        </Text>
      </View>

      <ChevronRight size={20} color="#A1A1AA" strokeWidth={2.4} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  memberCardShadow: {
    shadowColor: '#C7D5E0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 6,
  },
});

export default MemberCard;
