import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { ScrollView, FlatList, View, Image, Text, TextInput, Button, ImageBackground, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import groundBackground from "./../images/loginBackground.jpg"  
import termiteLogo from "./../images/loginImage.jpg"
import Icon from "react-native-vector-icons/Ionicons"
import Axios from 'axios';
// import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants'
import BurgerIcon from "../components/BurgerIcon"
import AddNewsPost from "../components/AddNewsPost"
import { connect } from 'react-redux'


import { Header } from 'react-native-elements';

import { NavigationEvents } from 'react-navigation';


const {width: WIDTH } = Dimensions.get('window')
class HomeScreen extends Component {
    state = {
      newsis: []
    }
    componentDidMount = async () => {
     try{
      let get_newsis_api_url = "https://jos-termite-api.herokuapp.com/newsis"
      let get_newsis_api_response = await Axios.get(get_newsis_api_url)
      let newsis = get_newsis_api_response.data.list_of_news_with_poster_name

      // Get profile picture from firebase



      await this.setState({newsis})
      console.log("here is the newsis state ", this.state.newsis)
     }catch(error){
        console.log("here is the error message ", error.message)
     }
      
    }
   

    render() {
      console.log("here is the redux user data state ", this.props.user_data)

        return (
          <React.Fragment>
               <NavigationEvents
                  onDidFocus={ this.componentDidMount}
              />

              <Header
                leftComponent={<BurgerIcon navigation={this.props.navigation}/>}
                centerComponent={{ text: 'Jos Termite News', style: { color: '#fff' } }}
                rightComponent={<AddNewsPost navigation={this.props.navigation}/>}
                containerStyle={{
                  backgroundColor: '#a52a2a',
                  border: "none",
                }}
              />
          <ScrollView style={styles.backgroundContainer}>
          <FlatList
            // style={styles.statusBar}
            data={this.state.newsis}
            keyExtractor={news => news.id}
            renderItem={({ item }) => { 
              return (
                  <View style={styles.post_container}>
                    <View style={styles.name_and_date_container}>
                      <Text style={styles.posterName}>
                        {item.posterName + " "}
                      </Text>
                      {/* when the user post a news we will format the date in a certain way before storing it. For now it's a messy date string. */}
                      <Text style={styles.updated_at_text}>{item.updatedAt}</Text>
                    </View>
                    <View style={styles.post_description_container}>
                      <Text>
                        {item.description}
                      </Text> 
                    </View>
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
  post_container: {
     backgroundColor: "tan",
     marginBottom: 5,
     padding: 25
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
  statusBar: {
    marginTop: Constants.statusBarHeight,
  },
  name_and_date_container: {
    // borderStyle: "solid", // this is where i left off
    // borderColor: "gray",
    // borderWidth: 1,
    marginLeft: 75
  },
  posterName: {
    fontSize: 15,
    color: "yellow"
  },
  updated_at_text: {
    fontSize: 10,
    color: "white"
  }
});

const mapStateToProps = (state) => ({
    user_data: state.user_data
})

const mapDispatchToProps = dispatch => {
	return {
     save_user_data: () => dispatch({type: actionTypes.SAVE_USER_DATA }),
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)