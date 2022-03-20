import React, { Component } from 'react'
import { Text, View, Button, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Header } from 'react-native-elements';
import BurgerIcon from "./../components/BurgerIcon"
import Add_new_channel_icon_button from "./../components/Add_new_channel_icon_button"
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux'
import * as actionTypes from "../store/actions"


import Axios from 'axios';
import SocketIOClient from 'socket.io-client'; 



export class ChatMenuScreen extends Component {
    state = {
        chat_channels: []
    }

    componentDidMount = async () => {
            try{
              // Set the param so news can be highlighted when you open the drawer
                this.props.save_which_screen_we_are_currently_in("Chat")

            // let socket = SocketIOClient("https://jos-termite-api.herokuapp.com");
            let get_chat_channels_api_url = "https://jos-termite-api.herokuapp.com/chat/chat-channels"
            let get_chat_channels_api_response = await Axios.get(get_chat_channels_api_url)

            let chat_channels = get_chat_channels_api_response.data.chat_channels
    
            await this.setState({chat_channels})

            }catch(error){
            console.log("here is the error message when getting the list of channels/chats ", error.message)
            }
    }

    enter_room = async () => {
        this.props.navigation.navigate('Chat Room', { 
            channel_name: item.name
         })
    }

    render() {
        const { navigation } = this.props; // ES2015 destructuring syntax
        
        return (
            <React.Fragment>
                <NavigationEvents
                  onDidFocus={ this.componentDidMount}
              />
                <Header
                    leftComponent={<BurgerIcon navigation={this.props.navigation}/>}
                    centerComponent={{ text: 'Chat Menu', style: { color: '#fff' } }}
                    rightComponent={<Add_new_channel_icon_button navigation={this.props.navigation}/>}
                    containerStyle={{
                    backgroundColor: '#a52a2a',
                    border: "none",
                }}
                 />
                <ScrollView style={styles.backgroundContainer}>
                    <FlatList
                        // style={styles.statusBar}
                        data={this.state.chat_channels}
                        keyExtractor={channel => channel.id}
                        renderItem={({ item }) => { 
                        return (
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => {
                                       this.props.navigation.navigate('Chat Room', { 
                                        channel_name: item.name,
                                        left_drawer_for_navigation: navigation
                                     }) 
                                    }}>
                                       <Text style={styles.channel_text}>
                                            {item.name + " "}
                                       </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                </ScrollView>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
   
    backgroundContainer: {
      backgroundColor: "tan"
     },
     
     channel_text: {
         color: "white",
         fontSize: 25,
         padding: 25
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


export default connect(mapStateToProps, mapDispatchToProps)(ChatMenuScreen)


