import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';

class Who_is_online_icon extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <TouchableOpacity onPress={() => {this.props.navigation.openDrawer()}}>
             <Icon name="people" color="#fff"/> 
        </TouchableOpacity>
    );
  }
}

export default Who_is_online_icon;
