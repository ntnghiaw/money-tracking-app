

const initialState = {
  period: {
    label: "Every Day",
    value: 'day'
  },
  type: 'budget'
}



const planReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PERIOD': 
      return {
        period: action.payload
      }

    case 'CREATE_BUDGET': 
      return action.payload

    case 'CHANGE_TYPE': 
      return {
        ...state,
        type: action.payload
      }

    case 'ADD_AMOUNT': 
      return action.payload
      
    default:
      return state;
  }
  };
  
  export default planReducer;