import React, { Component } from 'react'
// import { View, Image, Text, TextInput,  ImageBackground, StyleSheet,  KeyboardAvoidingView,  Dimensions} from 'react-native';
import { View, Image, Text, TextInput, Button, ImageBackground, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import groundBackground from "./../images/loginBackground.jpg"  
import { connect } from 'react-redux'
import Axios from 'axios';



const {width: WIDTH } = Dimensions.get('window')
 class CRUD_Form_Screen extends Component {
    state = {
        user_input: null
    }

    submit_form = async () => {
        let CRUD_form_API_URL = this.props.API_URL + this.props.navigation.getParam("API_end_point")
        let data = {
            ...this.props.navigation.getParam("data_to_send_to_API"),
            user_input
        }
        let CRUD_form_API_response = await Axios.post(CRUD_form_API_URL, data)
        this.props.navigation.goBack()

    }

    render() {
        return (
            <KeyboardAvoidingView style={{flex: 1, justifyContent: 'flex-end'}} behavior="padding">
                      {/* <SideMenu> */}
                    <ImageBackground source={groundBackground} style={styles.backgroundContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(user_input) => this.setState({user_input})}
                                placeholder={this.props.navigation.getParam("input_placeholder")}
                                placeholdTextColor={'rgba(255, 255, 0.7)'}
                                underlineColorAndroid='transparent'
                                autoCapitalize='none'
                        />
                        <TouchableOpacity onPress={this.submit_form} style={styles.btnLogin}>
                        <Text style={styles.text}>{this.props.navigation.getParam("submit_label")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.btnSignUp}>
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


export default connect(mapStateToProps, mapDispatchToProps)(CRUD_Form_Screen)

