import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LucideIcon } from 'lucide-react-native';

import { Colors } from 'Constants/Colors';
import { type PackageItem } from 'components/cards/PackagesCards/PackageCards';

export type RecommendedPackageItem = PackageItem & {
  id: number;
  recommendation: string;
  icon: LucideIcon;
};

type RecommendedPackageCardProps = {
  item: RecommendedPackageItem;
};

const RecommendedPackageCard = ({ item }: RecommendedPackageCardProps) => {
  const navigation = useNavigation<any>();
  const Icon = item.icon;

  const packageData: PackageItem = {
    badge: item.badge,
    audience: item.audience,
    title: item.title,
    description: item.description,
    parameters: item.parameters,
    price: item.price,
    oldPrice: item.oldPrice,
    note: item.note,
  };

  return (
    <Pressable
      onPress={() => navigation.navigate('PackageDetails', { packageData })}
      className="mr-3 w-[232px] rounded-[22px] border px-3.5 py-3.5"
      style={{
        borderColor: Colors.redishBG,
        shadowColor: Colors.textRed,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
        backgroundColor: Colors.cardRedBG,
      }}>
      <View
        className="h-10 w-10 items-center justify-center self-center rounded-full"
        style={{ backgroundColor: '#E9F7FA' }}>
        <Icon size={16} color={Colors.textBlue} strokeWidth={2.1} />
      </View>

      <Text className="mt-3 text-center text-sm leading-5" style={{ color: Colors.textWhite }}>
        {item.recommendation}
      </Text>

      <Text
        className="mt-1 text-center text-xl font-extrabold"
        style={{ color: Colors.textBlue }}>
        {item.price}
      </Text>
    </Pressable>
  );
};

export default RecommendedPackageCard;
