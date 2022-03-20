import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import * as actionTypes from "../store/actions"
import BurgerIcon from "./../components/BurgerIcon"
import { Header } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Axios from 'axios';

const {width: WIDTH } = Dimensions.get('window')
export class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        image: this.props.user_data.profile_pic,
        username: this.props.user_data.name,
        email: this.props.user_data.email,
        password: "",
        confirm_password: ""
    };
  }

  componentDidMount() {
    this.getPermissionAsync();



  }

  update_user_info = async () => {
      try{
        if(this.state.password === this.state.confirm_password && this.state.password !== ""){
            let update_user_info_API_URL = this.props.API_URL + "/users/edit"
            let data = {
                id: this.props.user_data.id,
                name: this.state.username,
                email: this.state.email,
                password: this.state.password,
                profile_pic: this.state.image
            }
    
            let update_user_info_API_response = await Axios.post(update_user_info_API_URL, data)
            alert("You have successfully updated your account information!")
          }else{
              alert("The password you entered does not match.")
          }
      }catch(error){
        alert("There was an error when sending the API request for updating user info ", error)
      }
  }

   // expo image picker
   getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }


  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.base64 });
    }
  };
  // expo image picker ends here

  render() {
    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" >
                <Header
                    leftComponent={<BurgerIcon navigation={this.props.navigation}/>}
                    centerComponent={{ text: 'Settings', style: { color: '#fff' } }}
                    // rightComponent={<Add_new_channel_icon_button navigation={this.props.navigation}/>}
                    containerStyle={{
                    backgroundColor: '#a52a2a',
                    border: "none",
                }}
            />
            <View style={styles.backgroundContainer}>
                <View stylee={styles.profile_picture_container}>
                        <Image   source={{uri: 'gs://users_profile_pictures/' + this.props.user_data.profile_pic }} style={styles.user_profile_picture}/>
                        <TouchableOpacity onPress={this._pickImage}>
                            <Text>
                                Change Profile Picture
                            </Text>
                        </TouchableOpacity>
                </View>
            </View>
            <View style={{backgroundColor: "tan", flex: 1, justifyContent: "flex-start", flexDirection: "column", height: 200}}>

                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("CRUD Form", {
                        API_end_point: "/users/edit",
                        // THIS IS WHERE I LEFT OFF. BUT I THINK IM JUST GOING TO HAVE THE TEXT INPUT HERE AND LET THEM EDIT IT ON THIS PAGE. MAKE IT EASIER THAT WAY. THAT WAY I GET A PROJECT COMPLETED RATHER THAN GETTING NO PROJECT COMPLETED AT ALL.
                    })}> */}
                    {/* <View styles={styles.user_info_container}> */}
                    <View style={styles.form_input}>
                            <Text>
                                Email:
                            </Text>
                            <TextInput
                                style={styles.input}
                                        onChangeText={(email) => this.setState({email})}
                                        placeholdTextColor={'tan'}
                                        underlineColorAndroid='transparent'
                                        placeholder="Enter your new Email plzz"

                                        autoCapitalize='none'
                                        value={this.state.email}
                                />
                        </View>
                        <View style={styles.form_input}>
                            <Text>
                                Username:
                            </Text>
                            <TextInput
                                style={styles.input}
                                        onChangeText={(username) => this.setState({username})}
                                        placeholdTextColor={'tan'}
                                        underlineColorAndroid='transparent'
                                        placeholder="Enter your new username"

                                        autoCapitalize='none'
                                        value={this.state.username}
                                />
                        </View>
                         <View style={styles.form_input}>
                            <Text>
                                Password:
                            </Text>
                            <TextInput
                                style={styles.input}
                                        onChangeText={(password) => this.setState({password})}
                                        placeholdTextColor={'tan'}
                                        placeholder="Enter your new password"
                                        underlineColorAndroid='transparent'
                                        autoCapitalize='none'
                                        value={this.state.password}
                                        secureTextEntry={true}
                                />
                        </View>
                        <View style={styles.form_input}>
                            <Text>
                                Confirm Password:
                            </Text>
                            <TextInput
                                style={styles.input}
                                        onChangeText={(password) => this.setState({password})}
                                        placeholdTextColor={'tan'}
                                        placeholder="Enter your new password"
                                        underlineColorAndroid='transparent'
                                        autoCapitalize='none'
                                        secureTextEntry={true}
                                        value={this.state.confirm_password}
                                />
                        </View>
                        <View style={styles.button}>
                        <Button
                            title="Save"
                            color="brown"
                              onPress={this.update_user_info}
                            />
                        </View>    
                        
                    {/* </View> */}
                    </View>
        </KeyboardAvoidingView>
        

    );
  }
}
const styles = StyleSheet.create({
   
    backgroundContainer: {
      backgroundColor: "tan",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      
     },
     profile_picture_container: {
        height: 0
     },
    //  channel_text: {
    //      color: "black",
    //      fontSize: 25,
    //      padding: 25
    //  },

     user_profile_picture: {
        width: 120,
        height: 120,
        borderRadius: 50,
        // marginRight: "auto"
        },
        input: {
            borderBottomColor: "brown",
            borderStyle: "solid",
            borderBottomWidth:  1,
            bottom: 5,
            marginLeft: 15,
            textAlign: "left"
        },
     user_info_container: {
        // flex: 1,
        
     },
     form_input: {
        // marginTop: ,
        marginLeft: 15,
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
     },
     button: {
        // width: 100,
        marginTop: 50,
        
        alignItems: "center",
      justifyContent: "center",

     }

    
  });


  const mapStateToProps = (state) => ({
    user_data: state.user_data,
    API_URL: state.API_URL
})

const mapDispatchToProps = dispatch => {
	return {
     save_user_data: () => dispatch({type: actionTypes.SAVE_USER_DATA }),
     save_which_screen_we_are_currently_in: (current_screen) => dispatch({
       type: actionTypes.SAVE_WHICH_SCREEN_WE_ARE_CURRENTLY_IN,
       current_screen: current_screen
    })
	};
};


 export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)




