import React from 'react';
import { Text, View } from 'react-native';

import { Colors } from 'Constants/Colors';
import TestCategoryCard, {
  type TestCategoryItem,
} from 'components/cards/PackagesCards/TestCategoryCard';

type TestCategoriesSectionProps = {
  items: TestCategoryItem[];
};

const TestCategoriesSection = ({ items }: TestCategoriesSectionProps) => {
  return (
    <View className="mt-6 px-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-4">
          <Text className="text-xl font-extrabold" style={{ color: Colors.textBlack }}>
            Test Categories
          </Text>
          <Text className=" text-sm " style={{ color: Colors.textBlack }}>
            Explore popular diagnostics by health focus, routine screening, and condition-specific
            testing.
          </Text>
        </View>
      </View>

      <View className="mt-4 flex-row flex-wrap justify-between">
        {items.map((item) => (
          <TestCategoryCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default TestCategoriesSection;
