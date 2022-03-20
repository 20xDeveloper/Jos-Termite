import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants'
import { connect } from 'react-redux'


class Navigation_drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  

  render() {
      console.log("here is the value for the profile_pic https://storage.cloud.google.com/users_profile_pictures/"+this.props.user_data.profile_pic)
    return (
        <View  style={styles.drawer_container}>
                    <View style={{ alignItems: "center"}}>
                        <Image   source={{uri: 'https://storage.cloud.google.com/users_profile_pictures/'+this.props.user_data.profile_pic }} style={styles.user_profile_picture}/>
                        <Text>{this.props.user_data.name}</Text>
                    </View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("News")} style={styles.navigation_link}>
                                       <Text style={this.props.active_screen === "News" ? {color: "brown"} : {color: "black"}}>
                                           News
                                       </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Chat")} style={styles.navigation_link}>
                                       <Text style={this.props.active_screen === "Chat" ? {color: "brown"} : {color: "black"}}>
                                           Chat
                                       </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity  onPress={() => this.props.navigation.navigate("Settings")} style={styles.navigation_link}>
                                       <Text style={this.props.active_screen === "Settings" ? {color: "brown"} : {color: "black"}}>
                                           Settings
                                       </Text>
                                    </TouchableOpacity>
                                    {this.props.user_data.admin ? <TouchableOpacity  onPress={() => this.props.navigation.navigate("Control Panel")} style={styles.navigation_link}>
                                       <Text style={this.props.active_screen === "Control Panel" ? {color: "brown"} : {color: "black"}}>
                                           Control Panel
                                       </Text>
                                    </TouchableOpacity> : null}
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Log out")} style={styles.navigation_link}>
                                       <Text >
                                           Log out
                                       </Text>
                                    </TouchableOpacity>
                                </View>
    );
  }
}



const styles = StyleSheet.create({
    drawer_container: {
        flex: 1,
        marginTop: Constants.statusBarHeight
    },
   navigation_link: {
       marginTop: 35,
       marginLeft: 25
   },
   user_profile_picture: {
    width: 120,
    height: 120,
    borderRadius: 50,
    // marginRight: "auto"
    }
})


const mapStateToProps = (state) => ({
    user_data: state.user_data,
    API_URL: state.API_URL,
    active_screen: state.active_screen
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


export default connect(mapStateToProps, mapDispatchToProps)(Navigation_drawer)
