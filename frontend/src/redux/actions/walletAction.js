import axios from "axios";
import { getState } from "redux"; // Thay thế với phương thức lấy state từ Redux store nếu không sử dụng Redux Toolkit

export const CREATE_WALLET_REQUEST = "CREATE_WALLET_REQUEST";
export const CREATE_WALLET_SUCCESS = "CREATE_WALLET_SUCCESS";
export const CREATE_WALLET_FAILURE = "CREATE_WALLET_FAILURE";

export const GET_ALL_WALLETS_REQUEST = "GET_ALL_WALLETS_REQUEST";
export const GET_ALL_WALLETS_SUCCESS = "GET_ALL_WALLETS_SUCCESS";
export const GET_ALL_WALLETS_FAILURE = "GET_ALL_WALLETS_FAILURE";

export const GET_DETAILED_WALLET_REQUEST = "GET_DETAILED_WALLET_REQUEST";
export const GET_DETAILED_WALLET_SUCCESS = "GET_DETAILED_WALLET_SUCCESS";
export const GET_DETAILED_WALLET_FAILURE = "GET_DETAILED_WALLET_FAILURE";

export const MODIFY_WALLET_REQUEST = "MODIFY_WALLET_REQUEST";
export const MODIFY_WALLET_SUCCESS = "MODIFY_WALLET_SUCCESS";
export const MODIFY_WALLET_FAILURE = "MODIFY_WALLET_FAILURE";

export const DELETE_WALLET_REQUEST = "DELETE_WALLET_REQUEST";
export const DELETE_WALLET_SUCCESS = "DELETE_WALLET_SUCCESS";
export const DELETE_WALLET_FAILURE = "DELETE_WALLET_FAILURE";

// API URL (adjust as needed)
const API_URL = "http://192.168.43.186:5000";

// Action creators
const createWalletRequest = () => ({ type: CREATE_WALLET_REQUEST });
const createWalletSuccess = (wallet) => ({
  type: CREATE_WALLET_SUCCESS,
  payload: wallet,
});
const createWalletFailure = (error) => ({
  type: CREATE_WALLET_FAILURE,
  payload: error,
});

const getAllWalletsRequest = () => ({ type: GET_ALL_WALLETS_REQUEST });
const getAllWalletsSuccess = (wallets) => ({
  type: GET_ALL_WALLETS_SUCCESS,
  payload: wallets,
});
const getAllWalletsFailure = (error) => ({
  type: GET_ALL_WALLETS_FAILURE,
  payload: error,
});

const getDetailedWalletRequest = () => ({ type: GET_DETAILED_WALLET_REQUEST });
const getDetailedWalletSuccess = (wallet) => ({
  type: GET_DETAILED_WALLET_SUCCESS,
  payload: wallet,
});
const getDetailedWalletFailure = (error) => ({
  type: GET_DETAILED_WALLET_FAILURE,
  payload: error,
});

const modifyWalletRequest = () => ({ type: MODIFY_WALLET_REQUEST });
const modifyWalletSuccess = (wallet) => ({
  type: MODIFY_WALLET_SUCCESS,
  payload: wallet,
});
const modifyWalletFailure = (error) => ({
  type: MODIFY_WALLET_FAILURE,
  payload: error,
});

const deleteWalletRequest = () => ({ type: DELETE_WALLET_REQUEST });
const deleteWalletSuccess = () => ({ type: DELETE_WALLET_SUCCESS });
const deleteWalletFailure = (error) => ({
  type: DELETE_WALLET_FAILURE,
  payload: error,
});

// Helper function to get token from state
const getAuthToken = (state) => state.auth.token;
// const userId = (state) => state.auth.token.userId;
// Thunks
export const getTokenConfig = async (getState) => {
  const token = getAuthToken(getState());
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
    },
  };
};

export const createWallet =
  (userId, name, balance, type) => async (dispatch, getState) => {
    dispatch(createWalletRequest());
    // const token = getAuthToken(getState());
    const token = getAuthToken(getState());
    console.log("1");
    try {
      const response = await axios.post(
        `${API_URL}/user/wallets`,
        { userId, name, balance, type },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
          },
        }
      );

      console.log(response.data);
      dispatch(createWalletSuccess(response.data));
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      ); // Log detailed error information
      dispatch(createWalletFailure(error.message));
    }
  };

export const getAllWallets = (userId) => async (dispatch, getState) => {
  dispatch(getAllWalletsRequest());
  const token = getAuthToken(getState());

  try {
    const response = await axios.get(
      `${API_URL}/user/getAllWallets/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(getAllWalletsSuccess(response.data));
  } catch (error) {
    dispatch(getAllWalletsFailure(error.message));
  }
};

export const getDetailedWallet =
  (userId, walletId) => async (dispatch, getState) => {
    dispatch(getDetailedWalletRequest());
    const token = getAuthToken(getState());

    try {
      const response = await axios.get(
        `${API_URL}/user/wallets/${userId}/${walletId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(getDetailedWalletSuccess(response.data));
    } catch (error) {
      dispatch(getDetailedWalletFailure(error.message));
    }
  };

export const modifyWallet =
  (userId, walletId, updates) => async (dispatch, getState) => {
    dispatch(modifyWalletRequest());
    const token = getAuthToken(getState());

    try {
      const response = await axios.put(
        `${API_URL}/user/wallets/${userId}/${walletId}`,
        updates,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(modifyWalletSuccess(response.data));
    } catch (error) {
      dispatch(modifyWalletFailure(error.message));
    }
  };

export const deleteWallet =
  (userId, walletId) => async (dispatch, getState) => {
    dispatch(deleteWalletRequest());
    const token = getAuthToken(getState());

    try {
      await axios.delete(`${API_URL}/user/wallets/${userId}/${walletId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(deleteWalletSuccess());
    } catch (error) {
      dispatch(deleteWalletFailure(error.message));
    }
  };
