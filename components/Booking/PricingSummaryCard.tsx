import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from 'Constants/Colors';

type PricingSummaryCardProps = {
  title?: string;
  packageName: string;
  packagePrice: string;
  collectionCharges: string;
  serviceTax: string;
  totalAmount: string;
};

const PricingSummaryCard = ({
  title = 'Order Summary',
  packageName,
  packagePrice,
  collectionCharges,
  serviceTax,
  totalAmount,
}: PricingSummaryCardProps) => {
  return (
    <View className="mt-8 rounded-[30px] bg-white p-6" style={styles.summaryCard}>
      <Text className="mb-5 text-lg font-extrabold" style={{ color: Colors.textBlack }}>
        {title}
      </Text>

      <View className="mb-4 flex-row justify-between">
        <Text className="text-sm" style={{ color: Colors.textGray }}>
          {packageName}
        </Text>

        <Text className="text-sm font-medium" style={{ color: Colors.textBlack }}>
          {packagePrice}
        </Text>
      </View>

      <View className="mb-4 flex-row justify-between">
        <Text className="text-sm" style={{ color: Colors.textGray }}>
          Collection Charges
        </Text>

        <Text className="text-sm font-bold" style={{ color: Colors.textBlue }}>
          {collectionCharges}
        </Text>
      </View>

      <View className="mb-5 flex-row justify-between">
        <Text className="text-sm" style={{ color: Colors.textGray }}>
          Service Tax
        </Text>

        <Text className="text-sm font-medium" style={{ color: Colors.textBlack }}>
          {serviceTax}
        </Text>
      </View>

      <View className="mb-5 h-[1px] bg-[#E5E5E5]" />

      <View className="flex-row justify-between">
        <Text className="text-xl font-extrabold" style={{ color: Colors.textBlack }}>
          Total Amount
        </Text>

        <Text className="text-2xl font-extrabold" style={{ color: Colors.textBlue }}>
          {totalAmount}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryCard: {
    shadowColor: Colors.textBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
});

export default PricingSummaryCard;
