import { FlatList, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'Constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlaskConical, Gauge, House, MapPin, TestTube2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBox from 'components/Search/SearchBox';
import LimitedOfferCard from 'components/cards/home/LimitedOfferCard';
import HomeBookTestCard from 'components/cards/home/HomeBookTestCard';
import PackageCard from 'components/cards/PackagesCards/PackageCards';

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
    audience: 'Male 30+',
    title: 'Executive Full Body - Male',
    description:
      'Premium preventive health check for working men covering major organs, diabetes, heart risk, thyroid, vitamins, and overall wellness.',
    parameters: '96 Parameters',
    price: 'Rs. 3,000',
    oldPrice: 'Rs. 3,600',
    note: 'Home collection included',
  },
];

const features = [
  {
    id: 1,
    title: 'Home Collection Only',
    subtitle: 'We are a home-visit collection service with no walk-in lab.',
    icon: House,
  },
  {
    id: 2,
    title: 'Accurate Testing',
    subtitle: 'Partner lab processing, trained technologists, accurate results every time.',
    icon: FlaskConical,
  },
  {
    id: 3,
    title: 'All Blood Tests',
    subtitle: 'Complete range from routine CBC to specialized hormone tests.',
    icon: TestTube2,
  },
  {
    id: 4,
    title: 'Same-Day Online Reports',
    subtitle: 'Digital reports with expert doctor suggestions, delivered fast.',
    icon: Gauge,
  },
];

const Home = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={[Colors.redishBG, '#F8F7F8', '#EEF5FB']}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" backgroundColor={Colors.redishBG} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="px-4">
            <Text className="text-2xl font-extrabold" style={{ color: Colors.textBlack }}>
              Hello, Aman
            </Text>

            <View className="mt-1 flex-row items-center">
              <MapPin size={14} color={Colors.textGray} strokeWidth={2.2} />
              <Text className="ml-1 text-sm" style={{ color: Colors.textGray }}>
                Pune, Hadapsar Central
              </Text>
            </View>
          </View>

          <SearchBox />
          <LimitedOfferCard />

          <View className="mt-5 px-4">
            <HomeBookTestCard />
          </View>

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

          <View className="mt-8 px-4">
            <Text className="text-xl font-extrabold" style={{ color: Colors.textBlack }}>
              Why Choose Us?
            </Text>

            <View className="mt-5 flex-row flex-wrap justify-between">
              {features.map((item) => (
                <View
                  key={item.id}
                  className="mb-3 w-[48.5%] rounded-[18px] border bg-white px-3 py-3"
                  style={{
                    borderColor: Colors.chipBorder,
                    shadowColor: Colors.blueShadow,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.07,
                    shadowRadius: 10,
                    elevation: 3,
                  }}>
                  <View
                    className="h-9 w-9 items-center justify-center self-center rounded-2xl"
                    style={{ backgroundColor: Colors.blueshBG }}>
                    <item.icon size={16} color={Colors.textBlue} strokeWidth={2.2} />
                  </View>

                  <View className="mt-2.5">
                    <Text
                      className="text-center text-xs font-bold"
                      style={{ color: Colors.textBlack }}>
                      {item.title}
                    </Text>

                    <Text
                      className="mt-1 text-center text-xs leading-4"
                      style={{ color: Colors.textGray }}>
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
