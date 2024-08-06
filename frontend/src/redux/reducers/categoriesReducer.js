import {
  FETCH_CATEGORIES_ERROR,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_PENDING,
} from '../actions/categoriesActions'

const initialState = {
  status: 'idle',
  categories: [],
  error: null,
}

export function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_PENDING:{
      if (state.status === 'idle') {
        return {
          ...state,
          status: 'pending',
        }
      }
      return state
    }
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        categories: action.payload,
      }
    case FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        status: 'rejected',
        error: action.error,
      }
    default:
      return state
  }
}
