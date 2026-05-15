import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import OPTVerifyScreen from 'screens/Auth/OPTVerifyScreen';
import AllPackegesSreen from 'screens/ALLPackeges';
import AboutUsScreen from 'screens/About Us/AboutUsScreen';
import { Colors } from 'Constants/Colors';
import PackageDetails from 'screens/PackageDetails/PackageDetails';
import BookingScreen from 'screens/Booking/BookingScreen';
import MemberDetailsScreen from 'screens/MemberDetails/MemberDetailsScreen';
import EditProfile from 'screens/Profile/EditProfile';
import TabNavigator from './tab-navigator';
import SupportScreen from 'screens/Support/SupportScreen';
import FAQScreen from 'screens/FAQ/FAQScreen';

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
    MemberDetailsScreen: {
      screen: MemberDetailsScreen,
      options: {
        headerShown: false,
      },
    },
    EditProfile: {
      screen: EditProfile,
      options: {
        headerShown: false,
      },
    },
    FAQScreen: {
      screen: FAQScreen,
      options: {
        headerShown: false,
      },
    },
    SupportScreen: {
      screen: SupportScreen,
      options: {
        headerShown: false,
      },
    },
    Tabs: {
      screen: TabNavigator,
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
