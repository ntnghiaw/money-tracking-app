// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';

import planReducer from './plan/planReducer';
import transactionReducer from './transaction/transactionReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  transaction: transactionReducer,
  plan: planReducer,
  // Add other reducers if needed
});

export default rootReducer;
