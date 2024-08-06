import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import Toast from 'react-native-toast-message'; // Đảm bảo đã cài đặt react-native-toast-message

// Define action types directly in this file
const LOGIN_START = "LOGIN_START";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const LOGOUT = "LOGOUT";

// Action to start login process
export const loginStart = () => {
  console.log("Login started");
  return { type: LOGIN_START };
};

// Action when login is successful
export const loginSuccess = (token, user) => {
  console.log("Login successful:", token);
  return { type: LOGIN_SUCCESS, payload: { token, user } };
};

// Action when login fails
export const loginFailure = (error) => {
  console.log("Login failed:", error);
  return { type: LOGIN_FAILURE, payload: error };
};

// Action to log out
export const logout = () => {
  console.log("User logged out");
  return { type: LOGOUT };
};

// Thunk action to handle login
export const login = (email, password, navigation) => async (dispatch) => {
  dispatch(loginStart());
  try {
    // Replace with your actual API call
    console.log("Sending login request");
    const response = await fetch(
      "https://financial-management-h89a.onrender.com/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    // console.log(data.user.wallets);
    if (response.ok) {
      dispatch(loginSuccess(data.token, data.user));
      if (data.user.wallets.length > 0) {
        navigation.navigate("Home", { user: data.user });
      } else {
        navigation.navigate("NewWallet");
      }
    } else {
      dispatch(loginFailure(data.message));
    }
  } catch (error) {
    console.error("Login error:", error);
    
    dispatch(loginFailure(error.message));
  }
};

export const handleLogout = (navigation) => async (dispatch) => {
  try {
    // Clear token from AsyncStorage or any other storage
    // await AsyncStorage.removeItem('token');
    // Dispatch logout action
    dispatch(logout());
  } catch (error) {
    console.error("Logout error:", error);
  }
};
