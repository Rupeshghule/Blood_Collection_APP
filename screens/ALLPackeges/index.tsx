import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'Constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBox from 'components/Search/SearchBox';
import PackageCard from 'components/cards/PackagesCards/PackageCards';
import PackageFilterChips from 'components/Packages/PackageFilterChips';
import { FilterChipIcons } from 'components/Packages/FilterChip';

const packages = [
  {
    id: 1,
    badge: 'Executive',
    audience: 'Male 30+',
    title: 'Executive Full Body - Male',
    description:
      'Premium preventive health check for working men covering major organs, diabetes, heart risk, thyroid, vitamins, and overall wellness.',
    parameters: '96 Parameters',
    price: 'Rs. 3,000',
    oldPrice: 'Rs. 3,600',
    note: 'Home collection included',
  },
  {
    id: 2,
    badge: 'Executive',
    audience: 'Female 30+',
    title: 'Executive Full Body - Female',
    description:
      'Comprehensive preventive package focused on thyroid, vitamin levels, blood health, hormones, and routine organ screening.',
    parameters: '92 Parameters',
    price: 'Rs. 2,800',
    oldPrice: 'Rs. 3,400',
    note: 'Fasting sample preferred',
  },
  {
    id: 3,
    badge: 'Diabetes',
    audience: 'Adults',
    title: 'Advanced Diabetes Care',
    description:
      'Essential diabetes monitoring panel with sugar profile, kidney function, cholesterol, and inflammation markers.',
    parameters: '54 Parameters',
    price: 'Rs. 1,499',
    oldPrice: 'Rs. 1,899',
    note: 'Doctor review available',
  },
  {
    id: 4,
    badge: 'Heart',
    audience: '40+',
    title: 'Cardiac Risk Screening',
    description:
      'Heart-focused diagnostic package covering lipid profile, ECG-related markers, and early cardiovascular risk indicators.',
    parameters: '48 Parameters',
    price: 'Rs. 1,999',
    oldPrice: 'Rs. 2,450',
    note: 'Includes lipid profile',
  },
];

const packageFilters = [
  { id: 'all', label: 'All', icon: FilterChipIcons.all },
  { id: 'executive', label: 'Executive', icon: FilterChipIcons.test },
  { id: 'wellness', label: 'Wellness', icon: FilterChipIcons.health },
  { id: 'organ', label: 'Organ', icon: FilterChipIcons.test },
  { id: 'women', label: 'Women', icon: FilterChipIcons.health },
  { id: 'senior', label: 'Senior', icon: FilterChipIcons.health },
  { id: 'specialty', label: 'Specialty', icon: FilterChipIcons.test },
];


const AllPackegesSreen = () => {
  return (
    <LinearGradient
      colors={[Colors.redishBG, '#F8F7F8', '#EEF5FB']}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <View className='mb-4'>
          <View className="px-4 pt-2">
            <Text className="text-2xl font-extrabold" style={{ color: Colors.textBlack }}>
              All Packages
            </Text>
            <Text className="mt-1 text-sm" style={{ color: Colors.textGray }}>
              Choose the health package that fits your needs
            </Text>
          </View>

          <SearchBox />
           <PackageFilterChips filters={packageFilters} defaultSelectedId="all" />
        </View>
        <FlatList
          data={packages}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
          renderItem={({ item }) => (
            <View className="mb-4 px-4">
              <PackageCard item={item} fullWidth />
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AllPackegesSreen;
