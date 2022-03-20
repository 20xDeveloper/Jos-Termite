import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, View, Image, Text, TextInput, Button, ImageBackground, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import groundBackground from "./../images/loginBackground.jpg"  
import termiteLogo from "./../images/loginImage.jpg"
import Icon from "react-native-vector-icons/Ionicons"
import axios from "axios"
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import base64 from 'react-native-base64'
import atob from 'atob'

import Dialog from "react-native-dialog";

import { Notifications, AppLoading } from 'expo';

// const { client } = require('google-cloud-bucket')
// import LZUTF8 from 'lzutf8';
// import { Storage } from '@google-cloud/storage';

// import ImagePicker from 'react-native-image-picker';
// import PhotoUpload from 'react-native-photo-upload'
// import console = require('console');


const {width: WIDTH } = Dimensions.get('window')
class SignUpScreen extends Component {
    state = {
        username: null,
        email: null,
        password: null,
        secret: null,
        loading: false,
        image: null,
        validation_and_loading_dialog: null,
        uploading: false
    }

    // componentDidMount() {
    //     var base64js = require('base64-js')
    //     this.getPermissionAsync();
    //     console.log('hi');
    //   }





    //   // expo image picker
    //   getPermissionAsync = async () => {
    //     if (Constants.platform.ios) {
    //       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //       if (status !== 'granted') {
    //         alert('Sorry, we need camera roll permissions to make this work!');
    //       }
    //     }
    //   }


    //   _pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.All,
    //       allowsEditing: true,
    //       aspect: [4, 3],
    //       quality: 1,
    //       base64: true
    //     });
    
    //     console.log(result);
    
    //     if (!result.cancelled) {
    //       this.setState({ image: result.base64 });
    //     }
    //   };

    _pickImage = async () => {
        const {
          status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
        // only if user allows permission to camera roll
        if (cameraRollPerm === 'granted') {
          let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
          });
          await this.setState({image: pickerResult})
        //   await this._handleImagePicked(pickerResult);
        }
      };



      _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;
        console.log("picker result ", pickerResult)
        try {
          this.setState({
            uploading: true
          });
    
          if (!pickerResult.cancelled) {
            uploadResponse = await uploadImageAsync(pickerResult.uri);
     
            uploadResult = await uploadResponse.json();
           
            // await this.setState({
            //   image: uploadResult.location
            // });
          }
        } catch (e) {
          console.log({ uploadResponse });
          console.log({ uploadResult });
          console.log({ e });
          alert('Upload failed, sorry :(');
        } finally {
          this.setState({
            uploading: false
          });
        }
      };
    



  
      // expo image picker ends here







    signUpHandler = async () => {
        try{
            // if(this.state.secret !== "joshua"){
            //     alert("Here is the value for the states ", this.state)
            // }else{
                   // Instantiate a FormData() object



             


                // This works with post man
                // const formData = new FormData();

                // const image = {
                //     uri: this.state.image.base64,
                //     type: this.state.image.type,
                //     name: 'test'
                //   }

                //   // append the image to the object with the title 'image'
                //   formData.append('name', "Lami");
                //   formData.append('image', image);

                //   let api_response = await axios.post("http://192.168.1.10:3000/users/test", formData, {
                //     headers: {
                //       'content-type': 'multipart/form-data'
                //     }
                // })
                // ends here



                // //   let instance = axios.create({
                // //       headers: {'Content-Type': 'multipart/form-data'}
                // //   })
                // //   let api_response = await instance.post("https://jos-termite-api.herokuapp.com/users/test", formData)






         






                // console.log("here is the image before we send it ", formData)
                //  let api_response = await fetch("http://192.168.1.10:3000/users/test", {
                //       method: "POST",
                //       body: formData
                //   })

                //   alert("here is the api response for testing ", api_response)
                //   console.log("here is the api response for testing ", api_response)

                 //   fetch(upload_user_profile_pic_API_URL, {
                //     method: 'POST',
                //     headers: {
                //       'Accept': 'application/json',
                //       'Content-Type': 'multipart/form-data',
                //     },
                //     body: imgBody
                //     }).then(res => res.json()).then(results => {
                //       // Just me assigning the image url to be seen in the view
                //     //   const source = { uri: res.imageUrl, isStatic: true };
                //     //   const images = this.state.images;
                //     //   images[index] = source;
                //     //   this.setState({ images });
                //   }).catch(error => {
                //     console.error(error);
                //   });
                //   const axios_instance = axios.create({
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //     }
                //   });


                if(this.state.username === null || this.state.password === null || this.state.email === null || this.state.secret === null){
                    let validation_and_loading_dialog = 
                    <Dialog.Container visible={true}>
                        <Dialog.Title>Validation Error</Dialog.Title>
                        
                        <Dialog.Description>
                            Please make sure all fields are filled in and you have uploaded an image for your profile picture.
                        </Dialog.Description>
                        
                        <Dialog.Button label="Okay" onPress={() => this.setState({validation_and_loading_dialog: null})} />
                    </Dialog.Container>
                    this.setState({validation_and_loading_dialog})

                    return
                }else if(this.state.secret !== "joshua"){
                    let validation_and_loading_dialog = 
                    <Dialog.Container visible={true}>
                        <Dialog.Title>Get out of here you are not welcomed!</Dialog.Title>
                        
                        <Dialog.Description>
                            The secret you entered was invalid. Please leave this app. You are not welcomed! >:D
                        </Dialog.Description>
                        
                        <Dialog.Button label="Okay" onPress={() => this.setState({validation_and_loading_dialog: null})} />
                    </Dialog.Container>
                    this.setState({validation_and_loading_dialog})

                    return
                }
                // Displaying the loading dialog
                let validation_and_loading_dialog = 
                <Dialog.Container visible={true}>
                    
                    <ActivityIndicator size="large" color="brown"/>
                    
                </Dialog.Container>
                this.setState({validation_and_loading_dialog})


                // -- Create the expo push notification token to store in the database table --
                // Register push notification for user when signing up. They change the notification settings later
                const { status: existingStatus } = await Permissions.getAsync(
                    Permissions.NOTIFICATIONS
                  );
                  let finalStatus = existingStatus;
                
                  // only ask if permissions have not already been determined, because
                  // iOS won't necessarily prompt the user a second time.
                  if (existingStatus !== 'granted') {
                    // Android remote notification permissions are granted during the app
                    // install, so this will only ask on iOS
                    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                    finalStatus = status;
                  }
                
                  // Stop here if the user did not grant permissions
                  if (finalStatus !== 'granted') {
                    return;
                  }
                
                  // Get the token that uniquely identifies this device
                  let token = await Notifications.getExpoPushTokenAsync();
                  
                
                  uploadResponse = await uploadImageAsync(this.state.image.uri, this.state.username);

                // -- Get the profile picture name that we stored in the google cloud storage --
                // This is the same exact process we used to create the file name for this user profile picture in the uploadImageAsync() function
                // I don't see any negative side effects from doing this way other than it being sloppy. So, i'm going to use it.
                let uriParts = this.state.image.uri.split('.');
                let fileType = uriParts[uriParts.length - 1];
                let file_name = `${this.state.username}_profile_picture.${fileType}`
                
               

                // POST the token to your backend server from where you can retrieve it to send push notifications.
                let signUpAPIUrl = this.props.API_URL + "/users"
                let data = {
                    name: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    profile_pic: file_name,
                    expo_push_notification_token: token
                }

                let signUpAPIResponse = await axios.post(signUpAPIUrl, data)

                if(signUpAPIResponse.data.error){
                    console.log('HEY')
                    throw new Error(signUpAPIResponse.data.error)
                }else{
                    validation_and_loading_dialog = 
                    <Dialog.Container visible={true}>
                        <Dialog.Title>Success!</Dialog.Title>
                        <Dialog.Description>
                            You have successfully created an account!
                        </Dialog.Description>
                        <Dialog.Button label="Okay" onPress={() => this.setState({validation_and_loading_dialog: null})} />
                    </Dialog.Container>
                    this.setState({validation_and_loading_dialog})
                    console.log("here is the message we get back from the sign up handler ", signUpAPIResponse)
                    this.props.navigation.navigate('Login')
                }


               
            // }
        }catch(error){
            let validation_and_loading_dialog = 
            <Dialog.Container visible={true}>
                <Dialog.Title>Validation Error</Dialog.Title>
                <Dialog.Description>
                {error.message}
                </Dialog.Description>
                <Dialog.Button label="Okay" onPress={() => this.setState({validation_and_loading_dialog: null})} />
            </Dialog.Container>
           

            this.setState({validation_and_loading_dialog})

            console.log("here is the error message ", error)
        }
        
      
    }

    // handleChoosePhoto = () => {
    //     const options = {
    //         noData: true,
    //       };
    //       ImagePicker.launchImageLibrary(options, response => {
    //         if (response.uri) {
    //           this.setState({ photo: response });
    //         }
    //       });
    // }

    back_to_login_screen = () => {
        this.props.navigation.navigate('Login')
    }

    render() {
  
        return (
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding" >
            <ImageBackground source={groundBackground} style={styles.backgroundContainer}>
               {/* <View style={styles.logoContainer}>
                   <Image source={termiteLogo} style={styles.logo}/>
               </View> */}
               <View style={styles.logoContainer}>
               {/* <Image source={termiteLogo} style={styles.logo}/> */}
               <Image   source={{uri: 'data:image/png;base64,' + this.state.image }} style={styles.logo}/>


                 <Text style={styles.logoText}>Welcome to the terminarium</Text>
               </View>
               
              
               {/* <Icon name={'ios-person-outline'} size={28} color={'rgba(255, 255, 255, 0.7)'} 
                style={styles.inputIcon}
               /> */}
                   <TextInput
                  onChangeText={(username) => this.setState({username})}
                   style={styles.input}
                        placeholder={"Username"}
                        placeholdTextColor={'rgba(255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                        autoCapitalize="none"
                   />
                     
               {/* <Icon name={'ios-person-outline'} size={28} color={'rgba(255, 255, 255, 0.7)'} 
                style={styles.inputIcon}
               /> */}
                   <TextInput
                  onChangeText={(email) => this.setState({email})}

                   style={styles.input}
                        placeholder={"Email"}
                        placeholdTextColor={'rgba(255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                        autoCapitalize="none"

                   />
                     
               {/* <Icon name={'ios-lock-outline'} size={28} color={'rgba(255, 255, 255, 0.7)'} 
                style={styles.inputIcon}
               /> */}
               <TextInput
                   onChangeText={(password) => this.setState({password})}

                   style={styles.input}
                        placeholder={"Password"}
                        secureTextEntry={true}
                        placeholdTextColor={'rgba(255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                        autoCapitalize="none"

                   />
                   <TouchableOpacity style={styles.btnEye}>
                        {/* <Icon Name={''} */}
                    </TouchableOpacity>


               {/* <Icon name={'ios-lock-outline'} size={28} color={'rgba(255, 255, 255, 0.7)'} 
                style={styles.inputIcon}
               /> */}
               <TextInput
                   onChangeText={(secret) => this.setState({secret})}

                   style={styles.input}
                        placeholder={"Secret"}
                        placeholdTextColor={'rgba(255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                        autoCapitalize="none"

                   />
                   {/* <TouchableOpacity style={styles.btnEye}> */}
                        {/* <Icon Name={''} */}
                    {/* </TouchableOpacity> */}
                    <Button
          title="Set image for profile pciture"
          onPress={this._pickImage}
          style={{marginTop: 7}}
        />

                   <TouchableOpacity onPress={this.signUpHandler} style={styles.btnLogin}>
                   <Text style={styles.text}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.back_to_login_screen} style={styles.back_button}>
                        <Text style={styles.text}>Back</Text>
                    </TouchableOpacity>
                    {this.state.loading ? <ActivityIndicator size="small" color="#00ff00"/> : null }
                    {this.state.validation_and_loading_dialog}
            </ImageBackground>
                   </KeyboardAvoidingView>

        )
    }
}

async function uploadImageAsync(uri, username) {
    let apiUrl = 'http://192.168.1.10:3000/users/test';
    console.log("1")
  
    // Note:
    // Uncomment this if you want to experiment with local server
    //
    // if (Constants.isDevice) {
    //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
    // } else {
    //   apiUrl = `http://localhost:3000/upload`
    // }
  
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('image', {
      uri,
      name: `${username}_profile_picture.${fileType}`,
      type: `image/${fileType}`,
    });
  
    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
  console.log("3")
    return fetch(apiUrl, options);
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
        // marginBottom: 5

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
    text: {
        color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 16,
          textAlign: "center"
    },
    back_button: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'blue',
        marginTop: 20,
        justifyContent: 'center'
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


export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
