import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Droplets, FlaskConical, HeartPulse, Stethoscope, TestTube2 } from 'lucide-react-native';
import { Colors } from 'Constants/Colors';
import SearchBox from 'components/Search/SearchBox';
import PackageFilterChips from 'components/Packages/PackageFilterChips';
import { FilterChipIcons } from 'components/Packages/FilterChip';
import PackageCard, { type PackageItem } from 'components/cards/PackagesCards/PackageCards';
import AdvancedPackageCard, {
  type AdvancedPackageItem,
} from 'components/cards/PackagesCards/AdvancedPackageCard';
import RecommendedPackagesSection from 'components/Profile/RecommendedPackagesSection';
import TestCategoriesSection from 'components/Test Categories/TestCategoriesSection';
import AppGradientScreen from 'components/layout/AppGradientScreen';
import {
  type RecommendedPackageItem,
} from 'components/cards/PackagesCards/RecommendedPackageCard';
import { type TestCategoryItem } from 'components/cards/PackagesCards/TestCategoryCard';

const packageFilters = [
  { id: 'all', label: 'All', icon: FilterChipIcons.all },
  { id: 'executive', label: 'Executive', icon: FilterChipIcons.test },
  { id: 'wellness', label: 'Wellness', icon: FilterChipIcons.health },
  { id: 'organ', label: 'Organ', icon: FilterChipIcons.test },
  { id: 'women', label: 'Women', icon: FilterChipIcons.health },
  { id: 'senior', label: 'Senior', icon: FilterChipIcons.health },
  { id: 'specialty', label: 'Specialty', icon: FilterChipIcons.test },
];

const packages: (PackageItem & { id: number })[] = [
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
    badge: 'Wellness',
    audience: 'Female 25+',
    title: 'Wellness Full Body - Female',
    description:
      'A balanced wellness panel covering blood count, sugar, liver, kidney, thyroid, and essential vitamins for preventive care.',
    parameters: '82 Parameters',
    price: 'Rs. 2,499',
    oldPrice: 'Rs. 3,100',
    note: 'Fasting recommended',
  },
];

const advancedPackages: AdvancedPackageItem[] = [
  {
    id: 1,
    badge: 'Autoimmune',
    audience: 'Adults',
    title: 'Autoimmune ILD Panel',
    description: 'Lung and immune system markers for interstitial lung disease screening.',
    parameters: '24 Parameters',
    price: 'Rs. 9,550',
    oldPrice: 'Rs. 10,400',
    note: 'Specialized panel',
  },
  {
    id: 2,
    badge: 'Autoimmune',
    audience: 'Adults',
    title: 'ANA ENA Combo Panel',
    description: 'Comprehensive autoimmune antibody profiling with 29 parameters.',
    parameters: '29 Parameters',
    price: 'Rs. 5,810',
    oldPrice: 'Rs. 6,450',
    note: 'Doctor advised',
  },
  {
    id: 3,
    badge: 'Kidney',
    audience: 'Adults',
    title: 'CKD Management Panel',
    description: 'Chronic kidney disease monitoring with 27 detailed renal parameters.',
    parameters: '27 Parameters',
    price: 'Rs. 2,960',
    oldPrice: 'Rs. 3,250',
    note: 'Follow-up package',
  },
  {
    id: 4,
    badge: 'Anemia',
    audience: 'Adults',
    title: 'Nutritional Anemia Panel',
    description: 'Complete anemia workup including iron deficiency and nutritional markers.',
    parameters: '21 Parameters',
    price: 'Rs. 3,150',
    oldPrice: 'Rs. 3,540',
    note: 'Vitamin and iron profile',
  },
];

const recommendedPackages: RecommendedPackageItem[] = [
  {
    id: 1,
    badge: 'Senior',
    audience: 'Senior Citizen',
    title: 'Senior Citizen Health',
    description: 'Curated screening package recommended for senior citizens.',
    parameters: '18 Parameters',
    price: 'Rs. 2,100',
    oldPrice: 'Rs. 2,450',
    note: 'Age-based recommendation',
    recommendation: 'Based on your age: Senior Citizen Health',
    icon: Stethoscope,
  },
  {
    id: 2,
    badge: 'Seasonal',
    audience: 'Adults',
    title: 'Allergy Profile',
    description: 'Seasonal allergy screening package for recurring symptoms.',
    parameters: '12 Parameters',
    price: 'Rs. 1,450',
    oldPrice: 'Rs. 1,800',
    note: 'Seasonal recommendation',
    recommendation: 'Seasonal: Allergy Profile',
    icon: FlaskConical,
  },
];

const testCategories: TestCategoryItem[] = [
  {
    id: 1,
    title: 'CBC Tests',
    subtitle: 'Complete blood count and routine blood health screening.',
    icon: Droplets,
  },
  {
    id: 2,
    title: 'Thyroid Tests',
    subtitle: 'TSH, T3, T4 and thyroid wellness assessment panels.',
    icon: HeartPulse,
  },
  {
    id: 3,
    title: 'Lipid Profile',
    subtitle: 'Cholesterol and triglyceride checks for heart risk monitoring.',
    icon: FlaskConical,
  },
  {
    id: 4,
    title: 'Vitamin Tests',
    subtitle: 'Vitamin deficiency testing for fatigue, immunity, and wellness.',
    icon: TestTube2,
  },
  {
    id: 5,
    title: 'Allergy Tests',
    subtitle: 'Seasonal and trigger-based allergy screening packages.',
    icon: Stethoscope,
  },
  {
    id: 6,
    title: 'Heart Markers',
    subtitle: 'Cardiac-focused diagnostics for preventive screening.',
    icon: HeartPulse,
  },
];

const PackagesScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <AppGradientScreen>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          {/* <View className="px-4">
            <Text className="text-xl font-bold" style={{ color: Colors.textBlue }}>
              Packages
            </Text>
          </View> */}
          <SearchBox />
          <PackageFilterChips filters={packageFilters} defaultSelectedId="all" />

          <View className="mt-7">
            <View className="flex-row items-center justify-between px-4">
              <Text className="text-2xl font-extrabold" style={{ color: Colors.textBlack }}>
                Popular Packages
              </Text>

              <TouchableOpacity onPress={() => navigation.navigate('AllPackegesSreen')}>
                <Text className="text-xs font-semibold" style={{ color: Colors.textBlue }}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              horizontal
              data={packages}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingLeft: 16,
                paddingRight: 6,
                paddingTop: 16,
              }}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <PackageCard item={item} />}
            />
          </View>

          <TestCategoriesSection items={testCategories} />

          <RecommendedPackagesSection items={recommendedPackages} />

          <View className="mt-8 px-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl font-extrabold" style={{ color: Colors.textBlack }}>
                Advanced Packages
              </Text>

              <TouchableOpacity onPress={() => navigation.navigate('AllPackegesSreen')}>
                <Text className="text-xs font-semibold" style={{ color: Colors.textBlue }}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <Text className="mt-2 text-sm leading-6" style={{ color: Colors.textGray }}>
              Specialized panels for deeper screening and condition-focused diagnostics.
            </Text>

            <View className="mt-5">
              {advancedPackages.map((item) => (
                <AdvancedPackageCard key={item.id} item={item} />
              ))}
            </View>
          </View>
        </ScrollView>
    </AppGradientScreen>
  );
};

export default PackagesScreen;
