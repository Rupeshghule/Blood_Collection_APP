import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Download, LucideIcon, Share2 } from 'lucide-react-native';
import { Colors } from 'Constants/Colors';
import CustomButton from 'components/Buttons/CustomButton';

export type ReportItem = {
  title: string;
  date: string;
  labId: string;
  icon: LucideIcon;
  color: string;
  bg: string;
};

type ReportCardProps = {
  report: ReportItem;
};

const ReportCard = ({ report }: ReportCardProps) => {
  const { title, date, labId, icon: Icon, color, bg } = report;

  return (
    <View
      className="mb-4 flex-row items-center rounded-[30px] p-5"
      style={[styles.card, { backgroundColor: Colors.textWhite }]}>
      <View className="flex-1 flex-row">
        <View
          className="mr-4 h-[54px] w-[54px] items-center justify-center rounded-full"
          style={{ backgroundColor: bg }}>
          <Icon size={24} color={color} strokeWidth={2.3} />
        </View>

        <View className="flex-1">
          <Text className="text-base font-extrabold leading-6" style={{ color: Colors.textBlack }}>
            {title}
          </Text>

          <Text className="mt-1 text-sm" style={{ color: Colors.textGray }}>
            {date} • Lab ID:
          </Text>

          <Text className="text-sm font-medium" style={{ color: Colors.textGray }}>
            {labId}
          </Text>

          <CustomButton
            title="Download PDF"
            icon={<Download size={16} color={Colors.textBlue} />}
            iconPosition="left"
            iconSpacing="mr-2"
            onPress={() => {}}
            backgroundColor={Colors.blueshBG}
            textColor={Colors.textBlue}
            height="h-auto"
            width="w-auto"
            rounded="rounded-full"
            className="mt-4 self-start px-4 py-3"
            buttonStyle={{ shadowOpacity: 0, shadowRadius: 0, elevation: 0 }}
            size="text-sm"
          />
        </View>
      </View>

      <TouchableOpacity
        className="ml-3 h-[48px] w-[48px] items-center justify-center rounded-full"
        style={{ backgroundColor: Colors.blueshBG }}
        onPress={() => {}}>
        <Share2 size={20} color={Colors.textBlue} strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: Colors.blueShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
});

export default ReportCard;
