import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Clock3, Droplets, LucideIcon, Pencil, UserRound } from 'lucide-react-native';

import { Colors } from 'Constants/Colors';

export type MemberHistoryItem = {
  id: string;
  test: string;
  date: string;
  status: string;
  amount: string;
};

export type FamilyMember = {
  id: number;
  name: string;
  relation: string;
  blood: string;
  age: string;
  image: string;
  history: MemberHistoryItem[];
};

type MemberSummaryCardProps = {
  member: FamilyMember;
  onEdit: () => void;
};

type MemberStatCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  backgroundColor: string;
  iconColor: string;
};

const MemberStatCard = ({
  label,
  value,
  icon: Icon,
  backgroundColor,
  iconColor,
}: MemberStatCardProps) => {
  return (
    <View className="w-[31%] items-center rounded-[20px] px-3 py-3" style={{ backgroundColor }}>
      <Icon size={18} color={iconColor} strokeWidth={2.3} />
      <Text
        className="mt-2 text-center text-xs font-semibold"
        style={{ color: Colors.textGray }}>
        {label}
      </Text>
      <Text
        className="mt-1 text-center text-sm font-extrabold"
        style={{ color: Colors.textBlack }}>
        {value}
      </Text>
    </View>
  );
};

const MemberSummaryCard = ({ member, onEdit }: MemberSummaryCardProps) => {
  return (
    <View
      className="rounded-[28px] bg-white px-5 py-5"
      style={{
        shadowColor: Colors.blueShadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 14,
        elevation: 4,
      }}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onEdit}
        className="absolute right-4 top-4 h-9 w-9 items-center justify-center rounded-full"
        style={{ backgroundColor: Colors.textBlue }}>
        <Pencil size={14} color={Colors.textWhite} strokeWidth={2.4} />
      </TouchableOpacity>

      <View className="items-center">
        <Image source={{ uri: member.image }} className="h-[88px] w-[88px] rounded-full" />
        <Text className="mt-4 text-2xl font-extrabold" style={{ color: Colors.textBlack }}>
          {member.name}
        </Text>
        <Text className="mt-1 text-sm font-medium" style={{ color: Colors.textBlue }}>
          {member.relation}
        </Text>
      </View>

      <View className="mt-5 flex-row justify-between">
        <MemberStatCard
          label="Blood Group"
          value={member.blood}
          icon={Droplets}
          backgroundColor={Colors.redishBG}
          iconColor={Colors.textRed}
        />
        <MemberStatCard
          label="Age"
          value={member.age}
          icon={UserRound}
          backgroundColor={Colors.blueshBG}
          iconColor={Colors.textBlue}
        />
        <MemberStatCard
          label="History"
          value={String(member.history.length)}
          icon={Clock3}
          backgroundColor={Colors.redishBG}
          iconColor={Colors.textRed}
        />
      </View>
    </View>
  );
};

export default MemberSummaryCard;
