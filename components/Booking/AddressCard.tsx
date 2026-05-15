import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { House } from 'lucide-react-native';
import { Colors } from 'Constants/Colors';

type AddressCardProps = {
  title: string;
  address: string;
};

const AddressCard = ({ title, address }: AddressCardProps) => {
  return (
    <View className="mt-5" style={styles.cardShadow}>
      <View className="overflow-hidden rounded-[28px]" style={styles.card}>
        <LinearGradient
          colors={[Colors.textWhite, '#FFF7F8', '#F5FBFD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}>
          <LinearGradient
            colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gloss}
          />
          <View className="flex-row items-center gap-2">
            <View
              className="mb-2 h-10 w-10 items-center justify-center rounded-full"
              style={styles.iconWrap}>
              <House size={20} color={Colors.textBlue} />
            </View>

            <Text className="mb-2 text-lg font-bold" style={{ color: Colors.textBlack }}>
              {title}
            </Text>
          </View>

          <Text className="text-sm leading-6" style={{ color: Colors.textBlack }}>
            {address}
          </Text>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.78)',
  },
  cardShadow: {
    shadowColor: Colors.textBlack,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
  cardGradient: {
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  gloss: {
    position: 'absolute',
    top: -18,
    left: -8,
    width: 220,
    height: 120,
    borderRadius: 999,
  },
  iconWrap: {
    backgroundColor: Colors.blueshBG,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.72)',
  },
});

export default AddressCard;
