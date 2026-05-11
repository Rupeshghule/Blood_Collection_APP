import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { FileText, FlaskConical, House, Menu, User } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from 'Constants/Colors';
import ProfileScreen from 'screens/Profile/ProfileScreen';
import Home from '../screens/Home/home';
import One from '../screens/one';
import Two from '../screens/two';

const Tab = createBottomTabNavigator();

function AppHeader({ navigation }: { navigation: any }) {
  return (
    <View style={styles.headerWrap}>
      <View style={styles.headerContent}>
        <Pressable onPress={() => navigation.getParent()?.openDrawer()} style={styles.sideButton}>
          <Menu size={32} color="#0B6C93" strokeWidth={2.3} />
        </Pressable>

        <View style={styles.brandBlock}>
          <Image source={require('../assets/Logo.png')} resizeMode="contain" style={styles.logo} />
        </View>

        <View style={styles.avatarShell}>
          <User size={24} color="#D8E9E6" strokeWidth={2.3} />
        </View>
      </View>
    </View>
  );
}

function TabButton({
  icon: Icon,
  label,
  isFocused,
  onPress,
}: {
  icon: any;
  label: string;
  isFocused: boolean;
  onPress: () => void;
}) {
  const liftAnim = useRef(new Animated.Value(0)).current;
  const barAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(liftAnim, {
        toValue: isFocused ? -8 : 0,
        useNativeDriver: true,
        tension: 160,
        friction: 9,
      }),
      Animated.timing(barAnim, {
        toValue: isFocused ? 1 : 0,
        duration: 220,
        useNativeDriver: false,
      }),
    ]).start();
  }, [barAnim, isFocused, liftAnim]);

  const barWidth = barAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 28],
  });

  return (
    <Pressable style={tabStyles.item} onPress={onPress} accessibilityRole="button">
      <Animated.View
        style={[
          tabStyles.iconWrap,
          isFocused && tabStyles.iconWrapActive,
          { transform: [{ translateY: liftAnim }] },
        ]}>
        <Icon size={24} color={isFocused ? '#FFFFFF' : '#7bb8e8'} strokeWidth={2.2} />
      </Animated.View>

      <Animated.View style={[tabStyles.activeLine, { width: barWidth }]} />

      <Text style={[tabStyles.label, isFocused && tabStyles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

function MedicalTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const iconMap: Record<string, any> = {
    Home: House,
    Reports: FileText,
    Tests: FlaskConical,
    Profile: User,
  };

  return (
    <View style={[tabStyles.bar, { paddingBottom: insets.bottom }]}>
      <View style={tabStyles.shine} pointerEvents="none" />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = typeof options.title === 'string' ? options.title : route.name;
        const isFocused = state.index === index;

        return (
          <TabButton
            key={route.key}
            icon={iconMap[route.name] ?? House}
            label={label}
            isFocused={isFocused}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
          />
        );
      })}
    </View>
  );
}

export default function AppTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MedicalTabBar {...props} />}
      screenOptions={({ navigation }) => ({
        header: () => <AppHeader navigation={navigation} />,
      })}>
      <Tab.Screen name="Home" component={Home} options={{ title: 'Home' }} />
      <Tab.Screen name="Reports" component={One} options={{ title: 'Reports' }} />
      <Tab.Screen name="Tests" component={Two} options={{ title: 'Tests' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown:false }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerWrap: {
    backgroundColor: Colors.redishBG,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF2',
    shadowColor: '#B8C6D2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  headerContent: {
    height: 96,
    marginTop: 1,
    paddingHorizontal: 22,
    paddingTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideButton: {
    width: 52,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  brandBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  logo: {
    width: 60,
    height: 60,
  },
  avatarShell: {
    width: 40,
    height: 40,
    borderRadius: 28,
    backgroundColor: '#1B4159',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const tabStyles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: Colors.blueshBG,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.85)',
    paddingTop: 0,
    paddingHorizontal: 16,
    alignItems: 'flex-end',
    shadowColor: '#0B6C93',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 16,
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: '5%',
    right: '5%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 0,
    paddingTop: 1,
    position: 'relative',
  },
  iconWrap: {
    width: 56,
    height: 42,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconWrapActive: {
    backgroundColor: '#0B6C93',
    shadowColor: '#0B6C93',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 8,
  },
  activeLine: {
    height: 2.5,
    borderRadius: 2,
    backgroundColor: Colors.blueShadow,
    marginTop: 0,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.TabTitleInactive,
    letterSpacing: 0.2,
  },
  labelActive: {
    color: '#0B6C93',
    fontWeight: '700',
    fontSize: 14,
  },
});
