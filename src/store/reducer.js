import * as actionTypes from "./actions"; //This has the list of actions. Now you don't have to type the string
//value for the action name. That would cause a error if you have a typo

//the initialState when you start the app
const initialState = {
	user_data: {},
	list_of_online_users: [], // we use this for the right drawer in the chat room screen to display the list of online users.
	API_URL: "http://192.168.1.10:3000",
	// API_URL: "https://jos-termite-api.herokuapp.com",

	active_screen: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SAVE_USER_DATA: 
			return {
				...state, //this makes it immutable which is a good practice. It means cloning.
                user_data: action.save_this_user_data
			};
		case actionTypes.REMOVE_USER_DATA: 
			return {
				...state, //this makes it immutable which is a good practice. It means cloning.
                user_data: null
			};
		case actionTypes.SAVE_LIST_OF_ONLINE_USERS: 
			return {
				...state, //this makes it immutable which is a good practice. It means cloning.
                list_of_online_users: action.online_users
			};
		case actionTypes.SAVE_WHICH_SCREEN_WE_ARE_CURRENTLY_IN: 
			return {
				...state, //this makes it immutable which is a good practice. It means cloning.
                active_screen: action.current_screen
			};
		default:
	}
	return state;
};

export default reducer;
