import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { ScrollView, FlatList, View, Text, TextInput, Button, ImageBackground, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native';
import groundBackground from "./../images/loginBackground.jpg"  
import Icon from "react-native-vector-icons/FontAwesome5"
import Axios from 'axios';
import * as actionTypes from "../store/actions"

import { Image } from 'react-native-elements';

// import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants'
import BurgerIcon from "./../components/BurgerIcon"
import AddNewsPost from "./../components/AddNewsPost"
import { connect } from 'react-redux'


import Dialog from "react-native-dialog";
import { Header } from 'react-native-elements';

import { NavigationEvents } from 'react-navigation';


const {width: WIDTH } = Dimensions.get('window')
class HomeScreen extends Component {
    state = {
      newsis: [],
      loading_dialog:
      <Dialog.Container visible={true}>
          
          <ActivityIndicator size="large" color="brown"/>
          
      </Dialog.Container>
    }
    componentDidMount = async () => {
     try{
      // Set the param so news can be highlighted when you open the drawer
      this.props.save_which_screen_we_are_currently_in("News")

      let get_newsis_api_url = this.props.API_URL + "/newsis"
      let data = {
        user_ID: this.props.user_data.id
      }
      let get_newsis_api_response = await Axios.post(get_newsis_api_url, data)
      let newsis = get_newsis_api_response.data.list_of_news_with_poster_name

      // Get profile picture from firebase



      await this.setState({newsis, loading_dialog: null})

      console.log(" newsis ", this.state.newsis)
     }catch(error){
        console.log("here is the error message ", error.message)
     }
      
    } 

    like_or_dislike = async (like_or_dislike, news_ID) => {
      let like_or_dislike_this_news_API_URL = this.props.API_URL + "/newsis/like_or_dislike"
      let data = {
        are_we_liking_or_disliking: like_or_dislike,
        news_ID: news_ID,
        user_ID: this.props.user_data.id
      }

      let like_or_dislike_this_news_API_response = await Axios.post(like_or_dislike_this_news_API_URL, data)
      console.log("1 ", like_or_dislike_this_news_API_response)

      let newsis = like_or_dislike_this_news_API_response.data.updated_newsis


      await this.setState({newsis})

      // Change the color of the icon based on if you liked or disliked
     
      
    }
   

    render() {

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
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Image source={{uri:'https://storage.cloud.google.com/users_profile_pictures/wp4250304.png'}} style={styles.user_profile_pic}/>

                      <View style={styles.name_and_date_container}>
                        <Text style={styles.posterName}>
                            {item.posterName + " "}
                        </Text>
                        <Text style={styles.updated_at_text}>{item.updatedAt}</Text>
                      </View>

                    </View>
                      <View style={styles.post_description_container}>
                        <Text>
                          {item.description}
                        </Text> 
                        {item.image === null ? null : <Image source={{uri: "gs://users_profile_pictures/" + item.image}} style={styles.news_image} />}

                    </View>
                    
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => this.like_or_dislike("liked", item.id)} style={styles.news_interaction_icons}>
                        <Icon name="thumbs-up" color={item.icon_color}/> 
                        <Text style={{marginLeft: 5, color: item.icon_color}}>{item.likes}</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => this.like_or_dislike("disliked", item.id)} style={styles.news_interaction_icons}>
                        <Icon name="thumbs-down" color={styles.dislike_icon.color}/> 
                        <Text style={{marginLeft: 5, color: "white"}}>{item.dislikes}</Text>
                    </TouchableOpacity> */}
                    {/* !!!!!!!!!!!!!!!!!!!!the onPress FUNCTION BELOW IS WHERE I LEFT OFF. i might have broke it by including the navigate function. didn't test it. just letting you know this is where i left off with out testing to see if it still works!!!!!!!!!!!!!!!!!!!!!!! */}
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment News', { news: item })} style={styles.news_interaction_icons}> 
                        <Icon name="comments" color={item.number_of_comments === 0 ? "#fff" : "brown"}/> 
                        <Text style={{marginLeft: 5, color: item.number_of_comments === 0 ? "#fff" : "brown"}}>{item.number_of_comments}</Text>

                    </TouchableOpacity>
                    </View>
                  </View>
              );
            }}
          />
          </ScrollView>
          {this.state.loading_dialog}
          </React.Fragment>
        )
    }
}


const styles = StyleSheet.create({
  post_container: {
     backgroundColor: "tan",
     marginBottom: 5,
     paddingLeft: 25,
     paddingRight: 25,
     paddingTop: 25


  },
  news_image: {
    width: 250,
    height: 250,
    marginTop: 15
    // borderRadius: 50
},
  like_icon: {
    color: "white"
  },
  dislike_icon: {
    color: "white"

  },
    user_profile_pic: {
      width: 50,
      height: 50,
      borderRadius: 50
  },
  news_interaction_icons: {
    width: 25,
    height: 25,
    marginLeft: 33,
    marginRight: 50,
    marginTop: 25,
    flex: 1, flexDirection: 'row'
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
      marginLeft: 15
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


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)