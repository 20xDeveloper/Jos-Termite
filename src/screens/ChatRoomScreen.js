import React, { Component, createRef } from 'react'
import Axios from 'axios';
import BurgerIcon from "./../components/BurgerIcon"
import BackArrow from "./../components/BackArrow"

import Who_is_online_icon from "./../components/Who_is_online_icon"
import { Header } from 'react-native-elements';
import SocketIOClient from 'socket.io-client'; 
import { connect } from 'react-redux'
import * as actionTypes from "../store/actions"
import { View, Image, Text, TextInput, Button, ImageBackground, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableOpacity, ScrollView, FlatList, scrollToEnd, AppState, ActivityIndicator } from 'react-native';
// import { Icon } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome5"
import { GiftedChat } from 'react-native-gifted-chat'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import Dialog from "react-native-dialog";

import termiteLogo from "./../images/loginImage.jpg"




const {width: WIDTH } = Dimensions.get('window')
const {height: HEIGHT } = Dimensions.get('window')

export class ChatRoomScreen extends Component {




    // you might need to use this in order to make the key this bind globally. I THINK.
    constructor(props) {
       super(props)
       this.state = {
           user_input_message: "",
           past_messages_for_this_channel: [],
           header: null,
           loading_dialog:
           <Dialog.Container visible={true}>
               
               <ActivityIndicator size="large" color="brown"/>
               
           </Dialog.Container>
       }

    }




    componentDidMount = async () => {
        // let get_previous_messages_for_this_channel_API_URL = "https://jos-termite-api.herokuapp.com/chat/chat-channels/previous-messages"
        // let data = {
        //     channel_name: navigation.getParam('channel_name', 'channel_name was not passed as a navigation parameter')
        // }

        // let get_previous_messages_for_this_channel_API_response = await Axios.post(get_previous_messages_for_this_channel_API_URL, data)

        // -- YOU CAN REMOVE THE ABOVE --


        
        this.getPermissionAsync();



        const { navigation } = this.props; // ES2015 destructuring syntax

        // -- IMPORTANT -- when you declare a variable with the keyword this it makes it accessible through out your whole code. i did not know that. Lack of knowledge is what causes errors and why it takes some programmer to develope application fast. -- IMPORTANT --
        // List of event listeners should go here when the component mounts
        // this.socket = SocketIOClient("https://jos-termite-api.herokuapp.com");
        this.socket = SocketIOClient(this.props.API_URL);

        
        this.socket.on('was connection successful', (connection_status) => {
            // if(connection_status === true){
            //     this.setState({are_you_online: true}) 
            // }

            this.socket.emit('new user joined the room', this.props.user_data.name, navigation.getParam('channel_name', 'channel_name was not passed as a navigation parameter'))
        });

        await this.socket.on("recieve list of online users", async (online_users) => {
            console.log("here is the list of online user we got from the express server ", online_users)
           await this.props.save_list_of_online_users({online_users}) // Destructuring ES2015 syntax
           const { navigation } = this.props; // ES2015 destructuring syntax

        let navigation_for_left_drawer = navigation.getParam("left_drawer_for_navigation", "left drawer navigation was not passed as param")
          let header = <Header
           leftComponent={<BackArrow navigation={this.props.navigation} navigate_back_to="Chat Menu"/>}
           centerComponent={{ text: "#" + navigation.getParam("channel_name", "channel_name was not passed as a navigation parameter"), style: { color: '#fff' } }}
           rightComponent={<Who_is_online_icon navigation={this.props.navigation}/>}
           containerStyle={{
           backgroundColor: '#a52a2a',
           border: "none",
           }}
       />
       this.setState({header})
        })

        this.socket.on("recieve past messages for this channel", (past_messages_for_this_channel) => {
            this.setState({past_messages_for_this_channel, loading_dialog: null}) // ES6 Object Destructuring syntax
            setTimeout(this.scrollToEnd, 3000)


        })

        // this can be your message that you sent or someones elses. Just letting you know so you have a better understanding of how everything works.
        this.socket.on("recieve user message",  (user_message) => {
            let past_messages_for_this_channel = [...this.state.past_messages_for_this_channel] // this makes it immutable. Never knew what the point was this but it's a good practice
            past_messages_for_this_channel.push(user_message)
             this.setState({past_messages_for_this_channel}) // ES6 Object Destructuring syntax
             setTimeout(this.scrollToEnd, 0)

        })

        //  this.scrollViewRef = createRef(null);
        // this.flatList.current.scrollToEnd()

        // Add the AppState change event to check if the user closed the app or in the background to set the user as offline
        AppState.addEventListener('change', state => {
            if(state === 'background' || state === 'inactive'){
                this.socket.emit("disconnecting", this.props.user_data.name)
                this.socket.disconnect() 
            }
          });
        
    }

    componentWillUnmount = async () => {
        this.socket.emit("disconnecting", this.props.user_data.name)
        this.socket.disconnect()
    }

    send_message = async () => {
        this.socket.emit("broadcast user message", this.state.user_input_message, this.props.user_data.name, this.props.navigation.getParam('channel_name', 'channel_name was not passed as a navigation parameter'), this.state.image)
        this.setState({user_input_message: ""})
    }

    scrollToEnd = () => {
        this.scrollView.scrollToEnd({animate: true});
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
    
    
        if (!result.cancelled) {
          await this.setState({ image: result.base64 });
          this.send_message()
        }
      };
      // expo image picker ends here


    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state.past_messages_for_this_channel.length == nextState.past_messages_for_this_channel.length) {
    //       return false;
    //     }
    //     this.scrollToEnd()
    //     return true

    //   }
    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.past_messages_for_this_channel.length !== prevState.past_messages_for_this_channel.length) {
    //         this.scrollToEnd()
    //       // make ajax calls
    //       // Perform any other function
    //     }
    //   }

    render() {
        const { navigation } = this.props; // ES2015 destructuring syntax

        let navigation_for_left_drawer = navigation.getParam("left_drawer_for_navigation", "left drawer navigation was not passed as param")

        // if(this.flatList.current !== null){
        //     this.flatList.current.scrollToEnd()
        // }

        // const scrollViewRef = useRef(null);
        // scrollViewRef.current.scrollToEnd({animate: true})
        return (
           <React.Fragment>
               {this.state.header}
                {/* <Header
                    leftComponent={<BurgerIcon navigation={navigation_for_left_drawer}/>}
                    centerComponent={{ text: "#" + navigation.getParam("channel_name", "channel_name was not passed as a navigation parameter"), style: { color: '#fff' } }}
                    rightComponent={<Who_is_online_icon navigation={this.props.navigation}/>}
                    containerStyle={{
                    backgroundColor: '#a52a2a',
                    border: "none",
                    }}
                /> */}
                <Button style={{backgroundColor: "gray", color: "white"}} title="Jump to latest messages" color="gray" onPress={() => {
              this.scrollToEnd()

                }
            }/>
              <KeyboardAvoidingView 
                style={{ flex: 1,  backgroundColor: "tan" }}
                behavior="padding">
                <ScrollView ref={(scrollView) => { this.scrollView = scrollView }} style={{backgroundColor: "tan"}}>
                    {/* <Button title="scroll down" onPress={() => {
        this.flatList.current.scrollToEnd()

                    }}/> */}
                    <FlatList
                        // style={styles.statusBar}
                        data={this.state.past_messages_for_this_channel}
                        keyExtractor={(message) => message.id}
                        renderItem={({ item }) => { 
                            return (
                                <View style={styles.post_container}>
                                
                                    {/* <View > */}
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <Image source={{uri: "gs://users_profile_pictures/" + item.profile_pic}} style={styles.logo}/>
                                            <View style={styles.message_container}>
                                                <Text style={styles.posterName}>
                                                    {item.username + " "}
                                                </Text>
                                                <Text style={styles.updated_at_text}>{item.updatedAt}</Text>
                                                gs://users_profile_pictures/testing14_profile_picture.jpg
                                                <Text style={styles.message}>
                                                    {item.message}
                                                </Text> 
                                                 {item.image === null ? null : <Image source={{uri: "data:image/png;base64," + item.image}} style={styles.image_in_message} />}

                                             </View>
                                    {/* when the user post a news we will format the date in a certain way before storing it. For now it's a messy date string. */}
                                        </View>
                                       
                                    {/* </View> */}
                                
                                </View>
                            );
                        }}
                    />
                </ScrollView>
        
                
                {/* <KeyboardAvoidingView> */}
              
                
                        <TouchableOpacity style={styles.insert_image_icon} onPress={this._pickImage}>
                            <Icon size={18} name="camera" color="rgba(255, 255, 255, 0.7)"/> 
                        </TouchableOpacity>
                        <TextInput
                                style={styles.input}
                                placeholder={"Message #" + navigation.getParam("channel_name", "channel_name was not passed as a navigation parameter")}
                                placeholdTextColor={'rgba(255, 255, 0.7)'}
                                underlineColorAndroid='transparent'
                                autoCapitalize='none'
                                multiline={true}
                                onChangeText={(user_input_message) => this.setState({user_input_message})}
                                value={this.state.user_input_message}
                                // onFocus={() => setTimeout(this.scrollToEnd, 100)}
                                onLayout={() => setTimeout(this.scrollToEnd, 100)}
                                // onSubmitEditing={()=>{this.send_message()}}
                        />
                        <TouchableOpacity style={styles.send_btn} onPress={this.send_message}>
                            <Icon size={18} name="paper-plane" color="rgba(255, 255, 255, 0.7)"/> 
                            {/* <Icon size={18} name="send" color="black"/>  */}

                        </TouchableOpacity>
                        {/* <GiftedChat /> */}
                        {this.state.loading_dialog}
                </KeyboardAvoidingView>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({

    input: {
        width: WIDTH,
        height: 35,
        // borderRadius: 25,
        fontSize: 11,
        paddingLeft: 50,
        paddingRight: 45,
        // backgroundColor: 'rgba(0, 0, 0, 0.35)',
        backgroundColor: 'brown',
        bottom: -20,
        color: 'rgba(255, 255, 255, 0.7)',
        // marginHorizontal: 25,
        // marginTop: 10
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    send_btn: {
        // position: 'relative',
        // bottom: 7,
        // left: WIDTH - 55,
        zIndex: 999999, // You use this to make content go on top of something. This is position absolute alternative. If you still want content to move along with each other when increasing the margin or something like that then zIndex is the way to go.
        width: 25,
        bottom: 7,
        left: WIDTH - 55,
        // left: 125
        
    },
    insert_image_icon: {
        zIndex: 999999, // You use this to make content go on top of something. This is position absolute alternative. If you still want content to move along with each other when increasing the margin or something like that then zIndex is the way to go.
        width: 25,
        top: 47,
        left: 20 ,
    },
    image_in_message: {
        width: 250,
        height: 250,
        marginTop: 7
        // borderRadius: 50
    },


    post_container: {
        backgroundColor: "tan",
        // marginBottom: 2,
        padding: 10
     },
     backgroundContainer: {
       // flex: 1,
       // width: null,
       // height: null,
       // justifyContent: 'center',
       // alignItems: 'center'
       backgroundColor: "silver"
   },
   post_description_container: {
     marginTop: 15
   },
    //  statusBar: {
    //    marginTop: Constants.statusBarHeight,
    //  },
     message_container: {
       // borderStyle: "solid", // this is where i left off
       // borderColor: "gray",
       // borderWidth: 1,
       marginLeft: 15
      
     },
     posterName: {
       fontSize: 15,
       color: "yellow"
     },
     updated_at_text: {
       fontSize: 10,
       color: "white"
     },
     message: {
        fontSize: 13,
        marginRight: 50,
        color: "black"
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
        }),

        save_list_of_online_users: (online_users) => 
        dispatch({
            type: actionTypes.SAVE_LIST_OF_ONLINE_USERS,
            online_users
           }),
        
        // -- THIS DOESN'T WORK --
    //  remove_user_data: () => 
    //     dispatch({
    //         type: actionTypes.REMOVE_USER_DATA,
    //        })
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomScreen)
