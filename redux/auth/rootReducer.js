// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import transactionReducer from '../transaction/transactionReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  transaction: transactionReducer
  // Add other reducers if needed
});

export default rootReducer;
