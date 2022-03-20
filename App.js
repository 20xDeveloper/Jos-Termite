import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Header } from 'react-native-elements';

// Screens
import LoginScreen from "./src/screens/LoginScreen"
import SignUpScreen from "./src/screens/SignUpScreen"
import HomeScreen from "./src/screens/HomeScreen"
import PostNewsFormScreen from "./src/screens/PostNewsFormScreen"
import ChatMenuScreen from "./src/screens/ChatMenuScreen"
import ChatRoomScreen from "./src/screens/ChatRoomScreen"
import CommentScreen from "./src/screens/CommentScreen"
import Add_New_Channel_Screen from "./src/screens/Add_New_Channel_Screen"
import SettingsScreen from "./src/screens/SettingsScreen"
import ControlPanelScreen from "./src/screens/ControlPanelScreen"

// import CRUD_Form_Screen from "./src/components/CRUD_Form_Screen"





import Who_is_online_right_drawer_content_for_chat_room from "./src/components/Who_is_online_right_drawer_content_for_chat_room"
import Navigation_drawer from "./src/components/Navigation_drawer"





// redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from "./src/store/reducer"; //Where all your reducers are



const Login_Stack_Navigator = createStackNavigator({
  "Sign up": SignUpScreen,
  Login: LoginScreen
}, {
  initialRouteName: 'Login',
  headerMode: "none"
});

const News_Stack_Navigator = createStackNavigator({
  News: HomeScreen,
  "Post News": PostNewsFormScreen,
  "Comment News": CommentScreen
}, {
  initialRouteName: 'News',
  headerMode: "none"
});



const Chat_Room_Drawer_Navigator = createDrawerNavigator(
  {
    "Chat Room": { screen: ChatRoomScreen },
  },
  {
    initialRouteName: "Chat Room",
    drawerPosition: "right",
    contentComponent: Who_is_online_right_drawer_content_for_chat_room,
    drawerBackgroundColor: "brown"
  },
)

const Chat_Stack_navigator = createStackNavigator(
  {
    // Main: {
    //   screen: MainStack,
    // },
    "Chat Menu": {
      screen: ChatMenuScreen,
    },
    "Chat Room": {
      screen: Chat_Room_Drawer_Navigator,
    },
    "Add New Channel": {
      screen: Add_New_Channel_Screen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'Chat Menu',
  }
);

// const Settings_stack_navigator = createStackNavigator(
//   {
//     "Settings": {
//       screen: SettingsScreen
//     },
//     "CRUD Form": {
//       screen: CRUD_Form_Screen
//     }
//   },
//   {
//     mode: 'modal',
//     headerMode: 'none',
//     initialRouteName: 'Settings',
//   }
// );

const MyDrawerNavigator = createDrawerNavigator({
  "Log out": {
    screen: Login_Stack_Navigator
  },
  News: {
    screen: News_Stack_Navigator
  },
  Chat: {
    screen: Chat_Stack_navigator
  },
  Settings: {
    screen: SettingsScreen
  },
  "Control Panel": {
    screen: ControlPanelScreen
  }

},
{
  edgeWidth: 0,
  contentComponent: Navigation_drawer,
  initialRouteName: 'Log out'
});

const MyApp = createAppContainer(MyDrawerNavigator);





// drawer navigation set up
// import { DrawerActions } from '@react-navigation/routers';

// const MyDrawerNavigator = createDrawerNavigator({
//   "Sign up": {
//     screen: SignUpScreen
//   },
//   Login: {
//     screen: LoginScreen,
    
//   },
//   News: {
//     screen: HomeScreen,
//     title: "News"
//   },
//   "Post News": {
//     screen: PostNewsFormScreen
//   }
 
// },
// {
//   edgeWidth: 0,
//   initialRouteName: 'Login'
// });

// const MyApp = createAppContainer(MyDrawerNavigator);


// stack navigator set up
// const AppNavigator = createStackNavigator({ 
  
//     SignUp: SignUpScreen,
//     Login: LoginScreen,
//     News: HomeScreen,
//     PostNews: PostNewsFormScreen
// },
// {
//   headerMode: "none",
//   initialRouteName: 'Login',
// });

// const MyApp = createAppContainer(AppNavigator);


// set up redux
const store = createStore(reducer); //link the reducer to the central store so it can change it

export default class App extends React.Component {
  render() {

    return (
      <Provider store={store}>
          <MyApp/>
      </Provider>
    );
  }
}
