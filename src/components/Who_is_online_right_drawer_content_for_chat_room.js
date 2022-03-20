import React, { Component } from 'react'
import { Text, View, Button, ScrollView, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'

import { SafeAreaView } from "react-native"
import { connect } from 'react-redux'
import SocketIOClient from 'socket.io-client'; 
import Constants from 'expo-constants'
import Axios from "axios"

import Dialog from "react-native-dialog";



const {width: WIDTH } = Dimensions.get('window')
export class Who_is_online_right_drawer_content_for_chat_room extends Component {
    state = {
        all_users_on_this_app: [],
        online_users_with_profile_picture: [],
        dialogVisible: false,
        ping_message: "",
        user_index_for_dialog: null, // We will use this to know which user to ping from the online_users_with_profile_picture state array
        dialog_content: null
    }

    componentDidMount = async () => {
        try{
            console.log('HEY ', this.props.online_users)
            // Get all the users on this app
            let get_all_users_on_this_app_API_URL = this.props.API_URL + "/users"
            let get_all_users_on_this_app_API_response = await Axios.get(get_all_users_on_this_app_API_URL)
            console.log("hi 1")

            // Get the profile picture for the list of online users
            let get_online_user_profile_picture_API_URL = this.props.API_URL + "/users/get-profile-picture-for-right-drawer"
            let data = {
                online_users_names: this.props.online_users.online_users
            }
            let get_online_user_profile_picture_API_response = await Axios.post(get_online_user_profile_picture_API_URL, data)
            console.log("hi 2")

            await this.setState({all_users_on_this_app: get_all_users_on_this_app_API_response.data.all_users_on_this_app, online_users_with_profile_picture: get_online_user_profile_picture_API_response.data.online_users_with_profile_picture })
            console.log("1 ", this.state.all_users_on_this_app)
            console.log("2 ", this.state.online_users_with_profile_picture)

        }catch(error){
            console.log("Here is the error message ", error)
        }
        
    }


    ping_user = async (ping_user_with_message ) => {
        try{
            
            let expo_push_notification_API_endpoint = "https://exp.host/--/api/v2/push/send"
            let data;
            if(ping_user_with_message){
                 data = {
                    to: this.state.online_users_with_profile_picture[this.state.user_index_for_dialog].expo_push_notification_token,
                    title: this.props.user_data.name + "pinged you",
                    body: this.state.ping_message
                } 
            }else{
                 data = {
                    to: this.state.online_users_with_profile_picture[this.state.user_index_for_dialog].expo_push_notification_token,
                    title: this.props.user_data.name + "pinged you",
                    body: ""
                }
            }
    
            let expo_push_notification_API_response = await Axios.post(expo_push_notification_API_endpoint, data)

            let dialog_success_content =  
            <Dialog.Container visible={true}>
                <Dialog.Title>Success!</Dialog.Title>
                <Dialog.Description>
                    You have successfully pinged this termite.
                </Dialog.Description>
                <Dialog.Button label="Okay" onPress={() => this.setState({dialog_content: null})} />
            </Dialog.Container>

            this.setState({dialog_content: dialog_success_content})
        }catch(error){
           console.log("here is the error message when pinging the user ", error)   
        }
        
        
    }

    render() {
        
        
        return (
            <View style={styles.who_is_online_drawer_container}>
                <Text style={{color: "white"}}>
                    Online Users
                </Text>
                    <ScrollView >
                            <FlatList
                                // style={styles.statusBar}
                                data={this.state.online_users_with_profile_picture}
                                // keyExtractor={online_user => online_user.name}
                                renderItem={({ item }) => { 
                                return (
                                        <View>
                                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: "row", padding: 12 }}>
                                            <Image source={{uri: "gs://users_profile_pictures/" + item.profile_pic}} style={styles.logo}/>
                                            <Text style={styles.online_user_name_text}>
                                                    {item.name}
                                            </Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }}
                            />
                        </ScrollView>
                        <Text style={{color: "white"}}>
                            All Users
                        </Text>
                        <ScrollView >
                        <FlatList
                            // style={styles.statusBar}
                            data={this.state.all_users_on_this_app}
                            // keyExtractor={online_user => online_user.name}
                            renderItem={({ item, index }) => { 
                            return (
                                    <View >
                                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: "row", padding: 12 }} onPress={() => this.setState(
                                            { dialog_content:  
                                                <Dialog.Container visible={true}>
                                                    <Dialog.Title>Ping Termite</Dialog.Title>
                                                    <Dialog.Description>
                                                        Please enter the message you wish to ping the user with.
                                                    </Dialog.Description>
                                                    <Dialog.Input style={{ 
                                                        borderBottomColor: '#000000',
                                                        borderBottomWidth: 1}} onChangeText={(ping_message) => this.setState({ping_message})}/>
                                                    <Dialog.Button label="Cancel" onPress={() => this.setState({ dialog_content: null})} />
                                                    <Dialog.Button label="No Message Just Ping" onPress={() => this.ping_user(false)} />
                                                    <Dialog.Button label="Send" onPress={() => this.ping_user(true)} />
                                                </Dialog.Container>,
                                              dialogVisible: true,
                                              user_index_for_dialog: index
                                            }
                                        )}>
                                        <Image source={{uri: "gs://users_profile_pictures/" + item.profile_pic}} style={styles.logo}/>
                                            <Text style={styles.offline_user_name_text}>
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            }}
                        />
                    </ScrollView>
                    {this.state.dialog_content}
                </View>
        )
    }
}

// export default Who_is_online_right_drawer_content_for_chat_room
const styles = StyleSheet.create({
   
    backgroundContainer: {
      backgroundColor: "tan"
     },
     logo: {
        width: 37.5,
        height: 37.5,
        borderRadius: 50
    },
     online_user_name_text: {
         color: "yellow",
         fontSize: 13,
         marginLeft: 12
        //  marginTop: Constants.statusBarHeight + 25,
     },
     offline_user_name_text: {
        color: "yellow",
        fontSize: 13,
        marginLeft: 12
        // marginTop: Constants.statusBarHeight + 25,
    },
    who_is_online_drawer_container: {
        marginTop: Constants.statusBarHeight,
    }
  });

const mapStateToProps = (state) => ({
    user_data: state.user_data,
    online_users: state.list_of_online_users,
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


export default connect(mapStateToProps, mapDispatchToProps)(Who_is_online_right_drawer_content_for_chat_room)

