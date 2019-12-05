import React from 'react';
import { Platform, Easing, Animated } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import { Block } from "galio-framework";

// screens Tab Bar
import HomeScreen from '../screens/Home/Home';
import ProfileScreen from '../screens/Profile/Profile';
import SetttingsScreen from '../screens/Settings/Settings';

// screens Login
import LoginScreen from '../screens/Profile/Login';
import RegisterScreen from '../screens/Profile/Register';
import ForgotPasswordScreen from '../screens/Profile/ForgotPassword';
import ResetPasswordScreen from '../screens/Profile/ResetPassword';

// screens Headquarters and Services
import HeadquartersScreen from '../screens/Headquarters/Headquarters';
import ServicesScreen from '../screens/Headquarters/Services';
import AppointmentScreen from '../screens/Headquarters/Appointment';

// Screens building
import Pro from '../screens/Onboarding/Pro';

// header for screens
import Header from "../components/Header";

// tab bar icons
import TabBarIcon from '../components/TabBarIcon';

// Internationalization
import i18n from '../locales/i18n';

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = "Searching";

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const HomeStack = createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header title={i18n.t('home.title')} navigation={navigation} />
        ),
      })
    },
    Pro: {
      screen: Pro,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header left={<Block />} white transparent navigation={navigation} />
        ),
        headerTransparent: true
      }),
    }
  },{
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig,
    headerMode: 'screen',
  }
);

HomeStack.navigationOptions = ({ navigation }) => {   
  let tabBarVisible = true;
  let routeName = navigation.state.routes[navigation.state.index].routeName
  if ( routeName == 'Pro') {
      tabBarVisible = false
  }
  return {
      tabBarVisible,
  }
}

const ProfileStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header left={<Block />} white transparent navigation={navigation} />
      ),
      headerTransparent: true
    })
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header title={i18n.t('profile.title')} navigation={navigation} />
      ),
    })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header left={<Block />} white transparent navigation={navigation} />
      ),
      headerTransparent: true
    })
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header left={<Block />} white transparent navigation={navigation} />
      ),
      headerTransparent: true
    })
    },
    ResetPassword: {
      screen: ResetPasswordScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header left={<Block />} white transparent navigation={navigation} />
        ),
        headerTransparent: true
      })
    },
},{
  cardStyle: { 
    backgroundColor: "#F8F9FE" 
  },
  transitionConfig,
  headerMode: 'none',
});

ProfileStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let routeName = navigation.state.routes[navigation.state.index].routeName
  if ( routeName == 'ResetPassword' || routeName == 'Pro' || routeName == 'Register' || routeName == 'ForgotPassword' || routeName == 'Login' ) {
      tabBarVisible = false
  }
  return {
      tabBarVisible,
  }
}

const HeadquartersStack = createStackNavigator({
  Headquarters: {
    screen: HeadquartersScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header title={i18n.t('headquarters.title')} navigation={navigation} />
      ),
    })
  },
  Services: {
    screen: ServicesScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header title={i18n.t('services.title')} navigation={navigation} />
      ),
    })
  },
  Appointment: {
    screen: AppointmentScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header title={i18n.t('appointment.title')} navigation={navigation} />
      ),
    })
  },
},{
  cardStyle: { 
    backgroundColor: "#F8F9FE" 
  },
  transitionConfig,
  headerMode: 'screen',
});

const SettingsStack = createStackNavigator({
  Settings: {
    screen: SetttingsScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header title={i18n.t('navigation.settings')} navigation={navigation} />
      ),
    })
  }
},{
  cardStyle: { 
    backgroundColor: "#F8F9FE" 
  },
  transitionConfig,
  headerMode: 'screen',
});

const AppStack = createBottomTabNavigator({    
  Home: {
    screen: HomeStack,
    navigationOptions: navOpt => ({      
      tabBarLabel: i18n.t('navigation.home'),
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />
      ),
    })
  },
  Profile: {
    screen: ProfileStack,
      navigationOptions: navOpt => ({
        tabBarLabel: i18n.t('navigation.profile'),
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} />
      ),
    })
  },
  Settings: {
    screen: SettingsStack,
      navigationOptions: navOpt => ({
        tabBarLabel: i18n.t('navigation.settings'),
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-cog' : 'md-settings'} />
      ),
    })
  },  
  Headquarters: {
    screen: HeadquartersStack,
    navigationOptions: navOpt => ({
      tabBarLabel: i18n.t('navigation.headquarters'),
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-business' : 'md-business'} />
      ),
    })
  },
},
{
  initialRouteName: "Profile",
  order: ["Home","Headquarters","Profile","Settings"],
  animationEnabled: true,
  swipeEnabled: true,
  tabBarPosition: 'bottom',
  tabBarOptions: {
      style: {
          ...Platform.select({
              android: {
                  backgroundColor: 'white'
              }
          })
      },
      showLabel: false,
      showIcon: true,
  }
});

const AppContainer = createAppContainer(AppStack);
export default AppContainer;