import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { View, Image, Text, TextInput, Button, ImageBackground, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native';
import groundBackground from "./../images/loginBackground.jpg"  
import termiteLogo from "./../images/loginImage.jpg"
import Icon from "react-native-vector-icons/Ionicons"
import Axios from 'axios';
import { connect } from 'react-redux'
import {AsyncStorage} from 'react-native';


import Dialog from "react-native-dialog";

import * as actionTypes from "../store/actions"
const SideMenu = require('react-native-side-menu');



const {width: WIDTH } = Dimensions.get('window')
class LoginScreen extends Component {
    state = {
        email: "",
        password: "",
        validation_dialog: null,
        loading_dialog: null
    }

    loginHandler = async () => {
        try{
            this.setState({loading_dialog:    <Dialog.Container visible={true}>
               
                <ActivityIndicator size="large" color="brown"/>
                
            </Dialog.Container>})
            let loginAPIUrl = "https://jos-termite-api.herokuapp.com/users/login"
            let data = {
                email: this.state.email,
                password: this.state.password
                // email: "test3@test.com",
                // password: "test123456"
            }
            let loginAPIResponse = await Axios.post(loginAPIUrl, data)
     
            console.log("here is the value from the login api response ", loginAPIResponse.data.user)

            // await AsyncStorage.setItem('user_token', loginAPIResponse.data.token);
           await this.props.save_user_data(loginAPIResponse.data.user)
            this.setState({loading_dialog: null})
           this.props.navigation.navigate('News')

        }catch(e){
            let validation_dialog = 
            <Dialog.Container visible={true}>
                <Dialog.Title>Validation Error</Dialog.Title>
                <Dialog.Description>
                    The credentials you entered was invalid.
                </Dialog.Description>
                <Dialog.Button label="Okay" onPress={() => this.setState({validation_dialog: null, loading_dialog: null})} />
            </Dialog.Container>

            this.setState({validation_dialog})

            console.log("here is the error message ", e)
        }
    }


    // -- THIS DOESN'T WORK --
    // If you really think about it this will only get fired if they logged in because in the login stack navigator if you go to sign up and go back it wont remount the component because it was underneath it and even if it did there is no user data to begin with. so let it remove the user data.
    // componentDidMount = async () => {
    //     this.props.remove_user_data() // used for logging the user out
    //     console.log("here is the updated user data when logging out ", this.props.user_data)
    // }

    render() {
        return (
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                      {/* <SideMenu> */}
                    <ImageBackground source={groundBackground} style={styles.backgroundContainer}>
                    {/* <View style={styles.logoContainer}>
                        <Image source={termiteLogo} style={styles.logo}/>
                    </View> */}
                    <View style={styles.logoContainer}>
                    <Image source={termiteLogo} style={styles.logo}/>

                        <Text style={styles.logoText}>Welcome to the terminarium</Text>
                    </View>
                    
                    {/* <Icon name={'ios-person-outline'} size={28} color={'rgba(255, 255, 255, 0.7)'} 
                        style={styles.inputIcon}
                    /> */}
                        <TextInput
                        style={styles.input}
                        onChangeText={(email) => this.setState({email})}
                                placeholder={"Email"}
                                placeholdTextColor={'rgba(255, 255, 0.7)'}
                                underlineColorAndroid='transparent'
                                autoCapitalize='none'
                        />
                            
                    
                    {/* <Icon name={'ios-lock-outline'} size={28} color={'rgba(255, 255, 255, 0.7)'} 
                        style={styles.inputIcon}
                    /> */}
                    <TextInput
                        style={styles.input}
                        onChangeText={(password) => this.setState({password})}
                                placeholder={"Password"}
                                secureTextEntry={true}
                                placeholdTextColor={'rgba(255, 255, 0.7)'}
                                underlineColorAndroid='transparent'
                                autoCapitalize='none'
                        />
                        <TouchableOpacity style={styles.btnEye}>
                                {/* <Icon Name={''} */}
                            </TouchableOpacity>
                        <TouchableOpacity onPress={this.loginHandler} style={styles.btnLogin}>
                        <Text style={styles.text}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Sign up')} style={styles.btnSignUp}>
                            <Text style={styles.text}>Sign Up</Text>
                            </TouchableOpacity>
                            {this.state.validation_dialog}
                            {this.state.loading_dialog}
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
    logo: {
        width: 120,
        height: 120,
        borderRadius: 50
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50
    },
    logoText: {
        color: "white",
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.5    
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
    user_data: state.user_data
    
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


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)