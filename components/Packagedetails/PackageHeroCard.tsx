import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BadgePercent } from 'lucide-react-native';
import { Colors } from 'Constants/Colors';
import { type PackageItem } from 'components/cards/PackagesCards/PackageCards';

type PackageHeroCardProps = {
  packageData: PackageItem;
};

const PackageHeroCard = ({ packageData }: PackageHeroCardProps) => {
  return (
    <View className="rounded-[34px] px-4 pb-5 pt-4" style={styles.heroCard}>
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold" style={{ color: Colors.textGray }}>
          {packageData.audience}
        </Text>

        <View className="flex-row items-center rounded-full px-3 py-2" style={styles.discountPill}>
          <BadgePercent size={14} color={Colors.textRed} strokeWidth={2.2} />
          <Text className="ml-2 text-xs font-semibold" style={{ color: Colors.textRed }}>
            Special pricing
          </Text>
        </View>
      </View>

      <Text className="mt-3 text-2xl font-extrabold leading-10" style={{ color: Colors.textBlack }}>
        {packageData.title}
      </Text>

      <Text className="mt-2 text-sm leading-6" style={{ color: Colors.textGray }}>
        {packageData.description}
      </Text>

      <View className="mt-4 flex-row items-end">
        <Text className="text-2xl font-extrabold" style={{ color: Colors.textRed }}>
          {packageData.price}
        </Text>

        <Text className="ml-3 text-sm line-through" style={{ color: Colors.textGray }}>
          {packageData.oldPrice}
        </Text>
      </View>

      <Text className="mt-1 text-xs font-semibold" style={{ color: Colors.textBlue }}>
        {packageData.note}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  discountPill: {
    backgroundColor: '#FFF1F3',
  },
  heroCard: {
    backgroundColor: Colors.textWhite,
    shadowColor: Colors.blueShadow,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 28,
    elevation: 8,
  },
});

export default PackageHeroCard;
