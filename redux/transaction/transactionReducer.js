

const initialState = {

      category: 'Select your category',
      amount: 0,
      createAt: new Date() ,
      type: 'expense'

}



const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'READ':
        return action.payload
      case 'CHANGE_TYPE': 
        return {
          ...state,
          type: action.payload
        }
      case 'GET_CATEGORY': 
        return action.payload
      default:
        return state;
    }
  };
  
  export default transactionReducer;