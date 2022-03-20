import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { DrawerActions } from '@react-navigation/routers';
import { Icon } from 'react-native-elements';


export class BurgerIcon extends Component {
    render() {
        return (
            // vs code is being stupid and showing random syntax error. ignore it. there is nothing wrong with the code.
            <TouchableOpacity onPress={() => {this.props.navigation.openDrawer()}}>
                <Icon name="menu" color="#fff"/> 
            </TouchableOpacity>
        )
    }
}

export default BurgerIcon
