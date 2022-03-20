const SideMenu = require('react-native-side-menu');


import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { ScrollView, FlatList, View, Image, Text, TextInput, Button, ImageBackground, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import groundBackground from "./../images/loginBackground.jpg"  
import termiteLogo from "./../images/loginImage.jpg"
import Icon from "react-native-vector-icons/Ionicons"
import Axios from 'axios';
// import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants'
import BurgerIcon from "./../components/BurgerIcon"
import AddNewsPost from "./../components/AddNewsPost"
import { connect } from 'react-redux'


import { Header } from 'react-native-elements';

import { NavigationEvents } from 'react-navigation';

class ContentView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+Control+Z for dev menu
        </Text>
      </View>
    );
  }
}

class Application extends React.Component {
  render() {
    const menu = <Menu navigator={navigator}/>;

    return (
      <SideMenu menu={menu}>
        <ContentView/>
      </SideMenu>
    );
  }
}