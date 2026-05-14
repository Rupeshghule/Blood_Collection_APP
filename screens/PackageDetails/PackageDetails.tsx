import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ArrowRight, ClipboardList, FlaskConical, House } from 'lucide-react-native';
import { Colors } from 'Constants/Colors';
import CustomButton from 'components/Buttons/CustomButton';
import { type PackageItem } from 'components/cards/PackagesCards/PackageCards';
import PackageHeroCard from 'components/Packagedetails/PackageHeroCard';

type RouteParams = {
  packageData?: PackageItem;
};

const fallbackPackage: PackageItem = {
  badge: 'Executive',
  audience: 'Adults',
  title: 'Executive Full Body Package',
  description:
    'Comprehensive preventive health package covering essential blood testing, routine screening, and home collection convenience.',
  parameters: '96 Parameters',
  price: 'Rs. 3,000',
  oldPrice: 'Rs. 3,600',
  note: 'Home collection included',
};

const PackageDetails = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { packageData = fallbackPackage } = (route.params as RouteParams) ?? {};

  const highlights = [
    {
      title: packageData.parameters,
      subtitle: 'Wide diagnostic coverage across core health markers.',
      icon: FlaskConical,
      color: Colors.textBlue,
      bg: Colors.blueshBG,
    },
    {
      title: packageData.note,
      subtitle: 'Convenient doorstep sample collection with guided support.',
      icon: House,
      color: Colors.textRed,
      bg: Colors.redishBG,
    },
    {
      title: packageData.audience,
      subtitle: 'Tailored package focus for the intended age group or profile.',
      icon: ClipboardList,
      color: Colors.textBlue,
      bg: Colors.blueshBG,
    },
  ];

  return (
    <LinearGradient
      colors={[Colors.redishBG, '#F6E9EA', '#F6F5F6', '#FFFFFF']}
      locations={[0, 0.24, 0.62, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" backgroundColor={Colors.redishBG} />

        <View className="flex-row items-center justify-between px-4 pb-3 pt-2">
          <CustomButton
            title="Back"
            width="w-auto"
            height="h-auto"
            rounded="rounded-full"
            size="text-xs"
            backgroundColor={Colors.textWhite}
            textColor={Colors.textBlack}
            icon={<ArrowLeft size={16} color={Colors.textBlack} strokeWidth={2.4} />}
            iconPosition="left"
            iconSpacing="mr-2"
            className="px-4 py-3"
            buttonStyle={styles.headerButton}
            onPress={() => navigation.goBack()}
          />

          <View className="rounded-full px-4 py-2" style={styles.badge}>
            <Text className="text-xs font-bold uppercase" style={{ color: Colors.textBlue }}>
              {packageData.badge}
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 170 }}>
          <PackageHeroCard packageData={packageData} />

          <View className="mt-6">
            <Text className="text-2xl font-extrabold" style={{ color: Colors.textBlack }}>
              Package Highlights
            </Text>

            <Text className="mt-1 text-sm" style={{ color: Colors.textGray }}>
              A quick overview of what makes this package useful and convenient.
            </Text>
          </View>

          <View className="mt-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <View
                  key={item.title}
                  className="mb-4 flex-row rounded-[26px] p-4"
                  style={styles.infoCard}>
                  <View
                    className="mr-4 h-[48px] w-[48px] items-center justify-center rounded-full"
                    style={{ backgroundColor: item.bg }}>
                    <Icon size={22} color={item.color} strokeWidth={2.3} />
                  </View>

                  <View className="flex-1">
                    <Text className="text-base font-bold" style={{ color: Colors.textBlack }}>
                      {item.title}
                    </Text>

                    <Text className="mt-1 text-xs leading-6" style={{ color: Colors.textGray }}>
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View className="rounded-[28px] p-5" style={styles.summaryCard}>
            <Text className="text-lg font-extrabold" style={{ color: Colors.textBlack }}>
              Before You Book
            </Text>

            <Text className="mt-1 text-sm leading-6" style={{ color: Colors.textGray }}>
              This package is designed for preventive screening and routine wellness monitoring.
              Final preparation guidance may vary based on the included tests.
            </Text>

            <Text className=" text-sm leading-6" style={{ color: Colors.textGray }}>
              Our team will confirm fasting requirements, home visit timing, and report delivery
              details after booking.
            </Text>
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-4" style={styles.bottomBar}>
          <View className="mb-3 flex-row items-center justify-between">
            <View>
              <Text className="text-xs font-medium" style={{ color: Colors.textGray }}>
                Package Price
              </Text>

              <Text className="text-2xl font-extrabold" style={{ color: Colors.textRed }}>
                {packageData.price}
              </Text>
            </View>

            <Text className="text-xs font-semibold" style={{ color: Colors.textBlue }}>
              {packageData.note}
            </Text>
          </View>

          <CustomButton
            title="Book Now"
            backgroundColor={Colors.textBlue}
            textColor={Colors.textWhite}
            height="h-14"
            rounded="rounded-[22px]"
            size="text-base"
            icon={<ArrowRight size={16} color={Colors.textWhite} strokeWidth={2.2} />}
            iconPosition="right"
            onPress={() => navigation.navigate('BookingScreen', { packageData })}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: Colors.textWhite,
    borderWidth: 1,
    borderColor: 'rgba(15,116,151,0.12)',
  },
  bottomBar: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderColor: 'rgba(15,116,151,0.08)',
  },
  headerButton: {
    shadowColor: Colors.blueShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  infoCard: {
    backgroundColor: Colors.textWhite,
    shadowColor: Colors.blueShadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  summaryCard: {
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#F7FBFD',
    borderWidth: 1,
    borderColor: 'rgba(15,116,151,0.08)',
  },
});

export default PackageDetails;
