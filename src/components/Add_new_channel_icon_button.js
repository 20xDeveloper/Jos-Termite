import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { DrawerActions } from '@react-navigation/routers';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'


class Add_new_channel_icon_button extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <TouchableOpacity onPress={() => {this.props.navigation.navigate("Add New Channel")}}>
            {this.props.user_data.admin ? <Icon name="add" color="#fff"/> : null} 
        </TouchableOpacity>
    );
  }
}


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


export default connect(mapStateToProps, mapDispatchToProps)(Add_new_channel_icon_button)

