import React, { type ReactNode } from 'react';
import { StatusBar, type ColorValue } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { Colors } from 'Constants/Colors';

type GradientColors = readonly [ColorValue, ColorValue, ...ColorValue[]];
type GradientLocations = readonly [number, number, ...number[]];

type AppGradientScreenProps = {
  children: ReactNode;
  colors?: GradientColors;
  locations?: GradientLocations;
  statusBarColor?: string;
};

const defaultColors: GradientColors = [Colors.redishBG, '#F6E9EA', '#F6F5F6', '#FFFFFF'];
const defaultLocations: GradientLocations = [0, 0.24, 0.62, 1];

const AppGradientScreen = ({
  children,
  colors = defaultColors,
  locations = defaultLocations,
  statusBarColor,
}: AppGradientScreenProps) => {
  return (
    <LinearGradient
      colors={colors}
      locations={locations}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" backgroundColor={statusBarColor || colors[0]} />
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AppGradientScreen;
