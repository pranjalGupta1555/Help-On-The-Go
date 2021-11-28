export const initialState = {
    userCredentials: {
        loggedIn: false,
        username: "",
        sessionToken: ""
    }
}

export const actionTypes = {
    SET_LOGIN: 'SET_LOGIN'
}

const reducer = (state, action) => {
    switch(action.type) {
        case actionTypes.SET_LOGIN:
            console.log(action, " __ ");
            return {
                ...state,
                userCredentials: {
                    loggedIn: true,
                    username: action.username,
                    sessionToken: action.sessionToken

                }
            }
        default:
            return state;
    }
}

export default reducer;