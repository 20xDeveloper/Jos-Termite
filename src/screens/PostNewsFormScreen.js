import React, {Component} from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import Constants from 'expo-constants'
import { Header } from 'react-native-elements';
import BackArrow from "./../components/BackArrow"
import Submit from "./../components/Submit"
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
// import TextInput2 from "./../components/TextInput2"



export class PostNewsFormScreen extends Component {

    state = {
        news_description: "",
        image: null
    }

    componentDidMount = () => {
      this.getPermissionAsync();
    }

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
        
      }
    };


    render() {
        return (
          <React.Fragment>
        <View style={styles.statusBar}>

            <Header
            placement="left"
            leftComponent={<BackArrow navigation={this.props.navigation} navigate_back_to="News" />}
            centerComponent={{ text: "Create News " + (this.state.image === null ? "" : "| image #1"), style: { color: '#fff' } }}
            rightComponent={<Submit news_description={this.state.news_description} news_image={this.state.image} navigation={this.props.navigation}/>}
            containerStyle={{
              backgroundColor: '#a52a2a',
              border: "none",
            }}
          />
            {/* <Text style={styles.label}>Enter Content:</Text> */}
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Tell us what happened."
              onChangeText={(news_description) => this.setState({news_description})}
            />
         
          </View>
             <View style={{flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'stretch',
              
              }}>
              <View style={{ height: 50}}>
                    <Button style={{backgroundColor: "gray", color: "white"}} title="Upload Image" color="gray" onPress={this._pickImage}/>
                    </View>
                  </View>
                  </React.Fragment>
        )
    }
}


const styles = StyleSheet.create({
    input: {
      fontSize: 18,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 15,
      padding: 5,
      margin: 5
    },
    label: {
      fontSize: 20,
      marginBottom: 5,
      marginLeft: 5
    },
    statusBar: {
        marginTop: Constants.statusBarHeight,
      }
  });

export default PostNewsFormScreen
