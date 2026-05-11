import { createDrawerNavigator } from '@react-navigation/drawer';
import { Menu } from 'lucide-react-native';
import TabNavigator from './tab-navigator';

const Drawer = createDrawerNavigator({
  initialRouteName: 'Tabs',
  screens: {
    Tabs: {
      screen: TabNavigator,
      options: ({ navigation }) => ({
        headerShown: false,
        drawerItemStyle: {
          display: 'none',
        },
        drawerIcon: ({ size, color }) => <Menu size={size} color={color} strokeWidth={2.2} />,
      }),
    },
  },
});

export default Drawer;
