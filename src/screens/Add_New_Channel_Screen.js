import React, { Component } from 'react'
// import { View, Image, Text, TextInput,  ImageBackground, StyleSheet,  KeyboardAvoidingView,  Dimensions} from 'react-native';
import { View, Image, Text, TextInput, Button, ImageBackground, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import groundBackground from "./../images/loginBackground.jpg"  
import { connect } from 'react-redux'
import Axios from 'axios';



const {width: WIDTH } = Dimensions.get('window')
 class Add_New_Channel_Screen extends Component {
    state = {
        new_channel_name: null
    }

    create_new_channel = async () => {
        // The database table called Chats is referring to channels
        let create_new_channel_API_URL = this.props.API_URL + "/chat/chat-channels/create"
        let data = {
            name: this.state.new_channel_name
        }   
        let create_new_channel_API_response = await Axios.post(create_new_channel_API_URL, data)
        this.props.navigation.navigate('Chat Menu')

    }

    render() {
        return (
            <KeyboardAvoidingView style={{flex: 1, justifyContent: 'flex-end'}} behavior="padding">
                      {/* <SideMenu> */}
                    <ImageBackground source={groundBackground} style={styles.backgroundContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(new_channel_name) => this.setState({new_channel_name})}
                                placeholder={"Enter new channel name"}
                                placeholdTextColor={'rgba(255, 255, 0.7)'}
                                underlineColorAndroid='transparent'
                                autoCapitalize='none'
                        />
                        <TouchableOpacity onPress={this.create_new_channel} style={styles.btnLogin}>
                        <Text style={styles.text}>Create</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat Menu')} style={styles.btnSignUp}>
                            <Text style={styles.text}>Back</Text>
                            </TouchableOpacity>
                    </ImageBackground>
                    {/* </SideMenu> */}
             </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
    },
  
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25,
        marginTop: 10
    },
    inputIcon: {
        position: 'absolute',
        top: 10,
        left: 37
    },
    inputContainer: {
        marginTop: 10,
    },
    btnEye: {
        position: 'absolute',
        top: 10,
        left: 37
    },
    btnLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'orange',
        marginTop: 20,
        justifyContent: 'center'
    },
    btnSignUp: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'blue',
        marginTop: 20,
        justifyContent: 'center'
    },
    text: {
        color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 16,
          textAlign: "center"
    }
})


const mapStateToProps = (state) => ({
    user_data: state.user_data,
    API_URL: state.API_URL
    
    
})

const mapDispatchToProps = dispatch => {
	return {
     save_user_data: (save_this_user_data) => 
     dispatch({
         type: actionTypes.SAVE_USER_DATA,
         save_this_user_data: save_this_user_data
        })

        // -- THIS DOESN'T WORK --
    //  remove_user_data: () => 
    //     dispatch({
    //         type: actionTypes.REMOVE_USER_DATA,
    //        })
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Add_New_Channel_Screen)

