export const initialState = {
    userCredentials: {
        loggedIn: false,
        username: "",
        sessionToken: "",
        userType: "",
        userDetails: {

        }
    },

}

export const actionTypes = {
    SET_LOGIN: 'SET_LOGIN',
    SET_USER_DETAILS: 'SET_USER_DETAILS'
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_LOGIN:
            console.log(action, " __ ");
            return {
                ...state,
                userCredentials: {
                    loggedIn: true,
                    username: action.username,
                    sessionToken: action.sessionToken,
                    userType: action.userType,
                    userDetails: action.userData
                }
            }
            
        default:
            return state;
    }
}

export default reducer;