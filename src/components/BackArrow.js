import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';

export class BackArrow extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate(this.props.navigate_back_to)
            }}>
               {/* <Icon name="keyboard_backspace" color="#fff"/> 
             */}
             {/* Come back to this later and find out why some icons aren't working if you dont like the X icon. */}
             <Icon name="close" color="#fff"/> 
            </TouchableOpacity>
        )
    }
}

export default BackArrow
