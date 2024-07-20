// Define action types directly in this file
const LOGIN_START = 'LOGIN_START';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

const initialState = {
  token: null,
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, token: action.payload.token, user: action.payload.user, isLoggedIn: true };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload, isLoggedIn: false };
    case 'LOGOUT':
      return { ...state, token: null, user: null, isLoggedIn: false };
    default:
      return state;
  }
};

export default authReducer;