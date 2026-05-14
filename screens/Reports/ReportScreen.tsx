import React from 'react';
import { View, Text, FlatList, StatusBar } from 'react-native';
import { Droplets, FlaskConical, HeartPulse } from 'lucide-react-native';
import { Colors } from 'Constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReportCard, { type ReportItem } from 'components/cards/ReportCard';

const reports: ReportItem[] = [
  {
    title: 'Complete Blood Count (CBC)',
    date: '14 April 2024',
    labId: '#772910',
    icon: Droplets,
    color: '#d11b28',
    bg: '#fcecec',
  },
  {
    title: 'Lipid Profile & Cholesterol',
    date: '28 March 2024',
    labId: '#771402',
    icon: FlaskConical,
    color: '#1573b6',
    bg: '#e9f4ff',
  },
  {
    title: 'Thyroid Stimulating Hormone (TSH)',
    date: '10 March 2024',
    labId: '#770192',
    icon: HeartPulse,
    color: '#0b7b9c',
    bg: '#e7f7fb',
  },
];

const ReportScreen = () => {
  return (
    <LinearGradient
      colors={[Colors.redishBG, '#F6E9EA', '#F6F5F6', '#FFFFFF']}
      locations={[0, 0.24, 0.62, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" backgroundColor={Colors.redishBG} />
        <FlatList
          data={reports}
          keyExtractor={(item) => item.labId}
          renderItem={({ item }) => <ReportCard report={item} />}
          showsVerticalScrollIndicator={false}
          className="flex-1 px-2"
          ListHeaderComponent={
            <View className="mb-5 flex-row items-center justify-between px-1">
              <Text className="text-xl font-extrabold" style={{ color: Colors.textBlack }}>
                My Reports
              </Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ReportScreen;
