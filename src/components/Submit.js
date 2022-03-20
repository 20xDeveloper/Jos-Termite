import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import Axios from 'axios';
import { connect } from 'react-redux'
import Dialog from "react-native-dialog";
// My intention was to use this for multipe screens. that is why I just called it submit but I just realized no other screen needed.
export class Submit extends Component {

    state = {
        loading_dialog: null
     
    }

    postNews = async () => {
        try{
            this.setState({loading_dialog:  <Dialog.Container visible={true}>
          
                <ActivityIndicator size="large" color="brown"/>
                
            </Dialog.Container>})
            let post_news_API_URL = this.props.API_URL + "/newsis/post-news"
            let data = {
                news_description: this.props.news_description,
                userID: this.props.user_data.id,
                image: this.props.news_image
            }
            let post_news_API_response = await Axios.post(post_news_API_URL, data)
            this.setState({loading_dialog: null})
            this.props.navigation.navigate("News")

        }catch(error){
            console.log("here is the error message when posting a news ", error)
        }
       

    }

    render() {
        return (
            <React.Fragment>
                <TouchableOpacity onPress={
                    this.postNews
                }>
                <Text style={{color: "white"}}>POST</Text>
                </TouchableOpacity>
                {this.state.loading_dialog}
            </React.Fragment>
        )
    }
}

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
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Submit)
