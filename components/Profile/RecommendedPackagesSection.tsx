import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { Colors } from 'Constants/Colors';
import RecommendedPackageCard, {
  type RecommendedPackageItem,
} from 'components/cards/PackagesCards/RecommendedPackageCard';

type RecommendedPackagesSectionProps = {
  items: RecommendedPackageItem[];
};

const RecommendedPackagesSection = ({ items }: RecommendedPackagesSectionProps) => {
  return (
    <View className="mt-7 px-4">
      <View
        className="overflow-hidden rounded-[24px] border px-4 pb-4 pt-3.5"
        style={{
          backgroundColor: Colors.textWhite,
          borderColor: Colors.blueshBG,
          shadowColor: Colors.blueShadow,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.08,
          shadowRadius: 14,
          elevation: 5,
        }}>
        <View
          pointerEvents="none"
          className="absolute -right-8 -top-8 h-20 w-20 rounded-full"
          style={{ backgroundColor: Colors.cardRedBG }}
        />
        <View
          pointerEvents="none"
          className="absolute -left-10 bottom-0 h-24 w-24 rounded-full"
          style={{ backgroundColor: Colors.blueshBG }}
        />

        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <View
              className="self-start rounded-full px-2.5 py-1"
              style={{ backgroundColor: Colors.textRed }}>
              <Text
                className="text-xs font-extrabold uppercase tracking-[0.7px]"
                style={{ color: Colors.textWhite }}>
                Personalized Picks
              </Text>
            </View>

            <Text
              className="mt-2.5 text-xl font-extrabold leading-7"
              style={{ color: Colors.textBlack }}>
              Recommended For You
            </Text>

            <Text className="mt-1.5 text-sm leading-5" style={{ color: Colors.textGray }}>
              Smart suggestions based on age, season, and preventive health priorities.
            </Text>
          </View>

          <View
            className="mt-0.5 rounded-full px-2.5 py-1.5"
            style={{ backgroundColor: Colors.blueshBG }}>
            <Text className="text-xs font-bold" style={{ color: Colors.textBlue }}>
              {items.length} Picks
            </Text>
          </View>
        </View>

        <FlatList
          horizontal
          data={items}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 14,
            paddingRight: 6,
          }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RecommendedPackageCard item={item} />}
        />
      </View>
    </View>
  );
};

export default RecommendedPackagesSection;
