import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import DrawerNavigator from './drawer-navigator';
import OPTVerifyScreen from 'screens/Auth/OPTVerifyScreen';
import AllPackegesSreen from 'screens/ALLPackeges';
import AboutUsScreen from 'screens/About Us/AboutUsScreen';
import { Colors } from 'Constants/Colors';
import PackageDetails from 'screens/PackageDetails/PackageDetails';
import BookingScreen from 'screens/Booking/BookingScreen';

const Stack = createStackNavigator({
  initialRouteName: 'Login',
  screens: {
    Login: {
      screen: LoginScreen,
      options: {
        headerShown: false,
      },
    },
    OTP: {
      screen: OPTVerifyScreen,
      options: {
        headerShown: false,
      },
    },
    AllPackegesSreen: {
      screen: AllPackegesSreen,
      options: {
        headerShown: false,
      },
    },
    AboutUsScreen: {
      screen: AboutUsScreen,
      options: {
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.redishBG,
        },
      },
    },
    PackageDetails: {
      screen: PackageDetails,
      options: {
        headerShown: false,
      },
    },
    BookingScreen: {
      screen: BookingScreen,
      options: {
        headerShown: false,
      },
    },
    DrawerNavigator: {
      screen: DrawerNavigator,
      options: {
        headerShown: false,
      },
    },
  },
});

type RootNavigatorParamList = StaticParamList<typeof Stack>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootNavigatorParamList {}
  }
}

const Navigation = createStaticNavigation(Stack);
export default Navigation;
