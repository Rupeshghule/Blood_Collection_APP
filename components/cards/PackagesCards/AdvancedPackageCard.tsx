import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from 'Constants/Colors';
import CustomButton from 'components/Buttons/CustomButton';
import { type PackageItem } from 'components/cards/PackagesCards/PackageCards';

export type AdvancedPackageItem = PackageItem & {
  id: number;
};

type AdvancedPackageCardProps = {
  item: AdvancedPackageItem;
};

const AdvancedPackageCard = ({ item }: AdvancedPackageCardProps) => {
  const navigation = useNavigation<any>();

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
      className="mb-3 rounded-[22px] border p-4"
      style={{
        backgroundColor: Colors.textBlue,
        borderColor: Colors.TabTitleInactive,
        shadowColor: Colors.blueShadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.14,
        shadowRadius: 12,
        elevation: 6,
      }}>
      <View
        className="self-start rounded-full px-3 py-1.5"
        style={{ backgroundColor: Colors.redishBG }}>
        <Text
          className="text-xs font-extrabold uppercase tracking-[0.6px]"
          style={{ color: Colors.textRed }}>
          {item.badge}
        </Text>
      </View>

      <Text
        className="mt-4 text-lg font-extrabold leading-7"
        style={{ color: Colors.textWhite }}>
        {item.title}
      </Text>

      <Text className="mt-1.5 text-sm leading-6" style={{ color: Colors.blueshBG }}>
        {item.description}
      </Text>

      <View className="mt-5 flex-row items-end justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-sm font-semibold" style={{ color: Colors.redishBG }}>
            {item.parameters}
          </Text>
          <Text className="mt-0.5 text-base font-extrabold" style={{ color: Colors.textWhite }}>
            {item.price}
          </Text>
        </View>

        <CustomButton
          title="Book"
          width="w-[104px]"
          height="h-[42px]"
          rounded="rounded-[16px]"
          size="text-sm"
          backgroundColor={Colors.redishBG}
          borderColor={Colors.redishBG}
          textColor={Colors.textBlue}
          icon={<ArrowRight size={14} color={Colors.textBlue} strokeWidth={2.2} />}
          iconPosition="right"
          onPress={() => navigation.navigate('BookingScreen', { packageData })}
          buttonStyle={{
            shadowColor: Colors.redishBG,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.12,
            shadowRadius: 10,
            elevation: 3,
          }}
        />
      </View>
    </Pressable>
  );
};

export default AdvancedPackageCard;
