import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, TextInput, Dimensions, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import * as actionTypes from "../store/actions"
import BurgerIcon from "./../components/BurgerIcon"
import { Header } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import settingsIcon from "./../images/settingsIcon.png"  

import Axios from 'axios';

const {width: WIDTH } = Dimensions.get('window')
export class ControlPanelScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        all_users_on_this_app: []
    };
  }

  async componentDidMount() {
    this.getPermissionAsync();


   // Get all the users on this app
   let get_all_users_on_this_app_API_URL = this.props.API_URL + "/users"
   let get_all_users_on_this_app_API_response = await Axios.get(get_all_users_on_this_app_API_URL)
    console.log("1 ", this.state.get_all_users_on_this_app_API_response)
   await this.setState({all_users_on_this_app: get_all_users_on_this_app_API_response.data.all_users_on_this_app})

console.log("2 ", this.state.all_users_on_this_app)


  }

  change_this_online_user_name = (event, user_ID) => {
    console.log("here is the event value ", event.target.value)
  }

//   update_user_info = async () => {
//       try{
//         if(this.state.password === this.state.confirm_password && this.state.password !== ""){
//             let update_user_info_API_URL = this.props.API_URL + "/users/edit"
//             let data = {
//                 id: this.props.user_data.id,
//                 name: this.state.username,
//                 email: this.state.email,
//                 password: this.state.password,
//                 profile_pic: this.state.image
//             }
    
//             let update_user_info_API_response = await Axios.post(update_user_info_API_URL, data)
//             alert("You have successfully updated your account information!")
//           }else{
//               alert("The password you entered does not match.")
//           }
//       }catch(error){
//         alert("There was an error when sending the API request for updating user info ", error)
//       }
//   }

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
                    centerComponent={{ text: 'Control Panel', style: { color: '#fff' } }}
                    // rightComponent={<Add_new_channel_icon_button navigation={this.props.navigation}/>}
                    containerStyle={{
                    backgroundColor: '#a52a2a',
                    border: "none",
                }}
            />
            <View style={styles.control_panel_image_container}>
                <Image source={settingsIcon} style={styles.user_profile_picture}/>
            </View>
                            <Text style={{textAlign: "center"}}>
                                Change Users Name
                            </Text>
                {/* <View style={{backgroundColor: "tan", flex: 1, justifyContent: "flex-start", flexDirection: "column", height: 200}}> */}
                    <ScrollView contentContainerStyle={styles.list_of_users_container}>
                        <FlatList
                            // style={styles.statusBar}
                            data={this.state.all_users_on_this_app}
                            keyExtractor={user => user.id}
                            renderItem={({ item }) => { 
                            return (
                                <TextInput
                                        // onChangeText={(password) => this.setState({password})}
                                        onBlur={(event) => this.change_this_online_user_name(event, item.id)}
                                        underlineColorAndroid='transparent'
                                        autoCapitalize='none'
                                        placeholderTextColor="black"
                                        placeholder={item.name}
                                />
                                );
                            }}
                        />
                    </ScrollView>
                {/* </View> */}
                </KeyboardAvoidingView >
        

    );
  }
}
const styles = StyleSheet.create({
   
    control_panel_image_container: {
      backgroundColor: "tan",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      
     },
     list_of_users_container: {
        backgroundColor: "tan",
        flex: 1,
        alignItems: "center",
        padding: 25
        // left: 12
        // marginLeft: 12
        // justifyContent: "center",
        
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


 export default connect(mapStateToProps, mapDispatchToProps)(ControlPanelScreen)




