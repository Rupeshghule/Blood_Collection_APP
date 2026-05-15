import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LucideIcon } from 'lucide-react-native';

import { Colors } from 'Constants/Colors';

export type TestCategoryItem = {
  id: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

type TestCategoryCardProps = {
  item: TestCategoryItem;
};

const TestCategoryCard = ({ item }: TestCategoryCardProps) => {
  const navigation = useNavigation<any>();
  const Icon = item.icon;

  return (
    <Pressable
      onPress={() => navigation.navigate('AllPackegesSreen')}
      className="mb-3.5 w-[31.5%] overflow-hidden rounded-[18px] border bg-white px-2.5 py-3"
      style={{
        borderColor: Colors.chipBorder,
        shadowColor: Colors.blueShadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
      }}>
      <View
        className="absolute left-0 right-0 top-0 h-[3px]"
        style={{ backgroundColor: Colors.textRed }}
      />

      <View
        className="h-9 w-9 items-center justify-center self-center rounded-full"
        style={{ backgroundColor: Colors.redishBG }}>
        <Icon size={16} color={Colors.textRed} strokeWidth={2.3} />
      </View>

      <Text
        className="mt-2.5 text-center text-sm font-extrabold leading-5"
        style={{ color: Colors.textBlack }}>
        {item.title}
      </Text>

      {/* <Text
        className="mt-1.5 text-center text-xs leading-4"
        style={{ color: Colors.textGray }}>
        {item.subtitle}
      </Text> */}
    </Pressable>
  );
};

export default TestCategoryCard;
