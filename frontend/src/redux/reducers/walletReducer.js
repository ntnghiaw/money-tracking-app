import {
  CREATE_WALLET_REQUEST,
  CREATE_WALLET_SUCCESS,
  CREATE_WALLET_FAILURE,
  GET_ALL_WALLETS_REQUEST,
  GET_ALL_WALLETS_SUCCESS,
  GET_ALL_WALLETS_FAILURE,
  GET_DETAILED_WALLET_REQUEST,
  GET_DETAILED_WALLET_SUCCESS,
  GET_DETAILED_WALLET_FAILURE,
  MODIFY_WALLET_REQUEST,
  MODIFY_WALLET_SUCCESS,
  MODIFY_WALLET_FAILURE,
  DELETE_WALLET_REQUEST,
  DELETE_WALLET_SUCCESS,
  DELETE_WALLET_FAILURE,
} from "../actions/walletAction";
import { LOGIN_SUCCESS, LOGOUT } from "../actions/authAction";

const initialState = {
  wallets: [],
  loading: false,
  error: null,
};

// Update the reducer to handle actions related to wallet management
const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_WALLET_REQUEST:
    case MODIFY_WALLET_REQUEST:
    case DELETE_WALLET_REQUEST:
      return { ...state, loading: true };
    case CREATE_WALLET_SUCCESS:
      return {
        ...state,
        loading: false,
        wallets: [...state.wallets, action.payload],
      };
    case MODIFY_WALLET_SUCCESS:
      return {
        ...state,
        loading: false,
        wallets: state.wallets.map((wallet) =>
          wallet._id === action.payload._id ? action.payload : wallet
        ),
      };
    case DELETE_WALLET_SUCCESS:
      return {
        ...state,
        loading: false,
        wallets: state.wallets.filter(
          (wallet) => wallet._id !== action.payload
        ),
      };
    case CREATE_WALLET_FAILURE:
    case MODIFY_WALLET_FAILURE:
    case DELETE_WALLET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_ALL_WALLETS_SUCCESS:
      return { ...state, wallets: action.payload };
    case LOGIN_SUCCESS:
      return {
        ...state,
        wallets: action.payload.user.wallets,
      };
    case LOGOUT:
      return {
        ...state,
        wallets: [],
      };
    default:
      return state;
  }
};

export default walletReducer;
