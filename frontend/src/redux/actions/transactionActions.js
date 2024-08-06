export const FETCH_TRANSACTIONS_PENDING = 'FETCH_TRANSACTIONS_PENDING'
export const FETCH_TRANSACTIONS_SUCCESS = 'FETCH_TRANSACTIONS_SUCCESS'
export const UPDATE_TRANSACTIONS_SUCCESS = 'UPDATE_TRANSACTIONS_SUCCESS'
export const UPDATE_TRANSACTIONS_PENDING = 'UPDATE_TRANSACTIONS_PENDING'
export const CREATE_TRANSACTIONS_PENDING = 'CREATE_TRANSACTIONS_PENDING'
export const FETCH_TRANSACTIONS_ERROR = 'FETCH_TRANSACTIONS_ERROR'
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'
export const CHANGE_TYPE = 'CHANGE_TYPE'
export const READ = 'READ'
export const GET_CATEGORY = 'GET_CATEGORY'
export const GET_CURRENT_SCREEN = 'GET_CURRENT_SCREEN'
export const CREATE_TRANSACTIONS_SUCCESS = 'CREATE_TRANSACTIONS_SUCCESS'
export const CREATE_TRANSACTIONS_ERROR = 'CREATE_TRANSACTIONS_ERROR'
import transactionApi from '../../api/services/transaction.api'


const fetchTransactionsPending = () => {
  return {
    type: FETCH_TRANSACTIONS_PENDING,
  }
}

const fetchTransactionsSuccess = (transactions) => {
  return {
    type: FETCH_TRANSACTIONS_SUCCESS,
    payload: transactions,
  }
}

const fetchTransactionsError = (error) => {
  console.log('error', error.response.data);
  
  return {
    type: FETCH_TRANSACTIONS_ERROR,
    payload: error.response.data,
  }
}
const updateTransactionSuccess = (transaction) =>  {
  return {
    type: UPDATE_TRANSACTIONS_SUCCESS,
    payload: transaction,
  }
}

const updateTransactionPending = (transaction) => {
  return {
    type: UPDATE_TRANSACTIONS_PENDING,
  }
}


const createTransactionSuccess = (transaction) => {
  return {
    type: CREATE_TRANSACTIONS_SUCCESS,
    payload: transaction,
  }
}



const createTransactionPending = () => {
  return {
    type: CREATE_TRANSACTIONS_PENDING,
  }
}




const getTransactions = (walletId, offset, limit) => async (dispatch) => {
  dispatch(fetchTransactionsPending())
  try {
    const resp = await transactionApi.fetchTransactions(walletId, offset, limit)
    dispatch(fetchTransactionsSuccess(resp.metadata))
  } catch (error) {
    console.log('error', error)
    dispatch(fetchTransactionsError(error))
  }
}

const getDetails = (_id) => {
  return {
    type: READ,
    payload: _id,
  }
}

const updateTransaction = (transactionId, data) => async (dispatch) => {
  dispatch(fetchTransactionsPending())
  try {
    const resp = await transactionApi.updateTransaction(transactionId, data)
    console.log('resp', resp)
    dispatch(updateTransactionSuccess(resp.metadata))
  } catch (error) {
    console.log(error)
    dispatch(fetchTransactionsError(error))
  }


}

const createTransaction = (data) => async (dispatch) => {
  dispatch(fetchTransactionsPending())
  try {
    const resp = await transactionApi.createTransaction(data)
    dispatch(createTransactionSuccess(resp.metadata))
  } catch (error) {
    console.log(error)
    dispatch(fetchTransactionsError(error))
  }

}

const getTransactionById = (transactionId) => async (dispatch) => {
  dispatch(fetchTransactionsPending())
  try {
    const resp = await transactionApi.fetchTransactionById()
    dispatch(fetchTransactionsSuccess(resp.metadata.transactions))
  } catch (error) {
    console.log(error)
    dispatch(fetchTransactionsError(error))
}
}

function changeCategory(category) {
  console.log('category', category);
  return {
    type: CHANGE_CATEGORY,
    payload: category,
  }
}



function changeType(type) {
  return {
    type: CHANGE_TYPE,
    payload: type,
  }
}

export {
  fetchTransactionsPending,
  fetchTransactionsSuccess,
  fetchTransactionsError,
  changeCategory,
  changeType,
  getTransactions,
  getDetails,
  updateTransactionSuccess,
  updateTransaction,
  createTransaction,
}

