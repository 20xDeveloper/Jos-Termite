import React, { Component } from 'react'
import { View, Image, Text, TextInput, Button, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableOpacity, ScrollView, FlatList } from 'react-native';

import BackArrow from "./../components/BackArrow"
import { connect } from 'react-redux'
import Axios from 'axios';
import Icon from "react-native-vector-icons/FontAwesome5"
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Header } from 'react-native-elements';



const {width: WIDTH } = Dimensions.get('window')
 class CommentScreen extends Component {

    state = {
        comments: [],
        image: null,
        user_input_comment: null
    }

    componentDidMount = async () => {
        let news = this.props.navigation.getParam('news', 'news was not passed as a navigation parameter')

        let get_list_of_comments_for_this_news_API_URL = this.props.API_URL + "/comments?news_ID=" + news.id
        let get_list_of_comments_for_this_news_API_response = await Axios.get(get_list_of_comments_for_this_news_API_URL)

        let comments = get_list_of_comments_for_this_news_API_response.data.comments_with_user_profile_pic
        
        this.setState({comments})
        this.getPermissionAsync();
    }

    post_comment = async () => {
        try{

            console.log("here is the value for the image state ", this.state.image)
            if(this.state.image !== null || this.state.user_input_comment !== null){
                let news = this.props.navigation.getParam('news', 'news was not passed as a navigation parameter')

                let post_comment_API_URL = this.props.API_URL + "/comments"
                let data = {
                    comment: this.state.user_input_comment,
                    news_ID: news.id,
                    user_ID: this.props.user_data.id,
                    image: this.state.image
                }
        
                let post_comment_API_response = await Axios.post(post_comment_API_URL, data)
        
                let new_comment_for_this_news  = post_comment_API_response.data.posting_comment_for_this_news
        
                let updated_list_of_comments = [...this.state.comments, new_comment_for_this_news]
        
                await this.setState({comments: updated_list_of_comments, user_input_comment: null, image: null}) 
                setTimeout(this.scrollToEnd, 100)
            }
        }catch(error){
            console.log("here is the error message when posting a comment ", error.message)
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
          await this.setState({ image: result.base64 });
          this.post_comment()
        }
      };
      // expo image picker ends here
   
    scrollToEnd = () => {
        this.scrollView.scrollToEnd({animate: true});
    }

    render() {
        let news = this.props.navigation.getParam('news', 'news was not passed as a navigation parameter')
        return (
            <React.Fragment>
                 <Header
                    placement="left"
                    leftComponent={<BackArrow navigation={this.props.navigation} navigate_back_to="News"/>}
                    centerComponent={{ text: "Comment", style: { color: '#fff' } }}
                    containerStyle={{
                    backgroundColor: '#a52a2a',
                    border: "none",
                    }}
                />
                  <Button style={{backgroundColor: "gray", color: "white"}} title="Jump to latest comments" color="gray" onPress={() => {
                    this.scrollToEnd()

                        }
                    }/>
                  <KeyboardAvoidingView 
                style={{ flex: 1,  backgroundColor: "tan" }}
                behavior="padding">
                <ScrollView ref={(scrollView) => { this.scrollView = scrollView }} style={{backgroundColor: "tan"}}>
                    <FlatList
                        data={this.state.comments}
                        keyExtractor={(comment) => comment.id}
                        renderItem={({ item }) => { 
                            return (
                                <View style={styles.post_container}>
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <Image source={{uri: "gs://users_profile_pictures/" + item.user_profile_pic}} style={styles.user_profile_pic}/>
                                            <View style={styles.message_container}>
                                                <Text style={styles.posterName}>
                                                    {item.username + " "}
                                                </Text>
                                                <Text style={styles.updated_at_text}>{item.updatedAt}</Text>
                                                {item.image === null ? <Text style={styles.message}>
                                                    {item.comment}
                                                </Text> : <Image source={{uri: "data:image/png;base64," + item.image}} style={styles.comment_image} />}
                                             
                                             </View>
                                        </View>
                                </View>
                            );
                        }}
                    />
                </ScrollView>
                        <TouchableOpacity style={styles.insert_image_icon} onPress={this._pickImage}>
                            <Icon size={18} name="camera" color="rgba(255, 255, 255, 0.7)"/> 
                        </TouchableOpacity>
                        <TextInput
                                style={styles.input}
                                placeholdTextColor={'rgba(255, 255, 0.7)'}
                                underlineColorAndroid='transparent'
                                autoCapitalize='none'
                                multiline={true}
                                onChangeText={(user_input_comment) => this.setState({user_input_comment})}
                                value={this.state.user_input_comment}
                                onLayout={() => setTimeout(this.scrollToEnd, 100)}
                                placeholder={"Write a comment..."}
                        />
                        <TouchableOpacity style={styles.send_btn} onPress={this.post_comment}>
                            <Icon size={18} name="paper-plane" color="rgba(255, 255, 255, 0.7)"/> 
                        </TouchableOpacity>
                </KeyboardAvoidingView>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: WIDTH,
        height: 35,
        fontSize: 11,
        paddingLeft: 50,
        paddingRight: 45,
        backgroundColor: 'brown',
        bottom: -20,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    user_profile_pic: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    comment_image: {
        width: 250,
        height: 250,
        // borderRadius: 50
    },
    send_btn: {
        zIndex: 999999, // You use this to make content go on top of something. This is position absolute alternative. If you still want content to move along with each other when increasing the margin or something like that then zIndex is the way to go.
        width: 25,
        bottom: 7,
        left: WIDTH - 55,
    },
    insert_image_icon: {
        zIndex: 999999, // You use this to make content go on top of something. This is position absolute alternative. If you still want content to move along with each other when increasing the margin or something like that then zIndex is the way to go.
        width: 25,
        top: 47,
        left: 20 ,
    },
    post_container: {
        backgroundColor: "tan",
        // marginBottom: 2,
        padding: 10
     },
     message_container: {
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
        color: "black"
      }
})

const mapStateToProps = (state) => ({
    user_data: state.user_data,
    API_URL: state.API_URL
})

const mapDispatchToProps = dispatch => {
	return {
     save_user_data: () => dispatch({type: actionTypes.SAVE_USER_DATA }),
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(CommentScreen)
