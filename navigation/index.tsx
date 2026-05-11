import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import DrawerNavigator from './drawer-navigator';
import OPTVerifyScreen from 'screens/Auth/OPTVerifyScreen';
import AllPackegesSreen from 'screens/ALLPackeges';
import AboutUsScreen from 'screens/About Us/AboutUsScreen';
import { Colors } from 'Constants/Colors';

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
