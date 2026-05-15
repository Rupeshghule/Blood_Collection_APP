import { Colors } from 'Constants/Colors';
import CustomButton from 'components/Buttons/CustomButton';
import { ArrowRight, FlaskConical, SlidersHorizontal } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ParametersModal from '../../../modal/Parameters/ParametersModal';

export type PackageItem = {
  badge: string;
  audience: string;
  title: string;
  description: string;
  parameters: string;
  price: string;
  oldPrice: string;
  note: string;
};

type PackageCardProps = {
  item: PackageItem;
  fullWidth?: boolean;
};

const PackageCard = ({ item, fullWidth = false }: PackageCardProps) => {
  const [isParametersVisible, setIsParametersVisible] = useState(false);
  const navigation = useNavigation<any>();
  const packageData = item;
  const handleOpenPackage = () =>
    navigation.navigate('PackageDetails', {
      packageData,
    });

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleOpenPackage}
        className={`h-[330px] rounded-[28px] border border-[#E8EDF3] bg-white p-4 shadow-sm ${
          fullWidth ? 'w-full' : 'mr-4 w-[340px]'
        }`}>
        <View className="flex-row items-center justify-between">
          <View className="self-start rounded-full bg-[#E7F4FF] px-4 py-1">
            <Text
              className="text-xs font-bold uppercase tracking-[1px]"
              style={{ color: Colors.textBlue }}>
              {item.badge}
            </Text>
          </View>

          <Text className="text-sm font-medium" style={{ color: Colors.textGray }}>
            {item.audience}
          </Text>
        </View>

        <View className="mt-1 flex-1">
          <Text
            numberOfLines={2}
            className="text-xl font-extrabold leading-8"
            style={{ color: Colors.textBlack }}>
            {item.title}
          </Text>

          <Text className="mt-1 text-sm leading-6" style={{ color: Colors.textGray }}>
            {item.description}
          </Text>

          <View className="mt-1 flex-row items-center">
            <FlaskConical size={14} color={Colors.textBlue} strokeWidth={2.3} />
            <Text className="ml-2 text-sm font-bold" style={{ color: Colors.textBlack }}>
              {item.parameters}
            </Text>
          </View>

          <View className="mt-2 flex-row items-center">
            <Text className="text-xl font-extrabold" style={{ color: Colors.textRed }}>
              {item.price}
            </Text>

            <Text className="text-md ml-3 line-through" style={{ color: Colors.textGray }}>
              {item.oldPrice}
            </Text>
          </View>

          <Text className="mt-1 text-sm" style={{ color: Colors.textBlue }}>
            {item.note}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <CustomButton
            title="View Parameters"
            width="w-[145px]"
            height="h-12"
            rounded="rounded-2xl"
            size="text-sm"
            backgroundColor={Colors.textWhite}
            borderColor={Colors.textBlue}
            textColor={Colors.textBlue}
            icon={<SlidersHorizontal size={16} color={Colors.textBlue} strokeWidth={2.2} />}
            iconPosition="left"
            iconSpacing="mr-2"
            onPress={() => setIsParametersVisible(true)}
          />

          <CustomButton
            title="Book Now"
            width="w-[145px]"
            height="h-12"
            rounded="rounded-2xl"
            size="text-sm"
            backgroundColor={Colors.textBlue}
            textColor={Colors.textWhite}
            icon={<ArrowRight size={14} color={Colors.textWhite} strokeWidth={2.2} />}
            iconPosition="right"
            onPress={() => navigation.navigate('BookingScreen', { packageData })}
          />
        </View>
      </TouchableOpacity>

      <ParametersModal
        visible={isParametersVisible}
        onClose={() => setIsParametersVisible(false)}
        title={item.title}
        description={item.description}
        parameters={item.parameters}
        price={item.price}
        oldPrice={item.oldPrice}
        note={item.note}
      />
    </>
  );
};

export default PackageCard;
