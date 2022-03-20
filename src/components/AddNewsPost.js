import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';


export class AddNewsPost extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Post News')
            }}>
               <Icon name="add" color="#fff"/> 
            </TouchableOpacity>
          
        )
    }
}

export default AddNewsPost
