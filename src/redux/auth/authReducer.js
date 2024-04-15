// authReducer.js
const initialState = {
    isLoggedIn: false,
    // Other user-related state can be added here
    user: null,

  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload,

        };
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  