export const FETCH_CATEGORIES_PENDING = 'FETCH_CATEGORIES_PENDING';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR';
import categoryApi from '../../api/services/category.api';


const  fetchCategoriesPending = () => {
    return {
        type: FETCH_CATEGORIES_PENDING
    }
}

const fetchCategoriesSuccess = (categories) => {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        payload: categories
    }
}

const fetchCategoriesError = (error) => {
    return {
      type: FETCH_CATEGORIES_ERROR,
      error: error.response.data,
    }
}


const getAllCategories  = () => async (dispatch) => {
    dispatch(fetchCategoriesPending())
    try {
        const resp = await categoryApi.fetchCategories()
        dispatch(fetchCategoriesSuccess(resp.metadata.categories))
    } catch (error) {
        console.log(error)
        dispatch(fetchCategoriesError(error))
    }
}

export {
    getAllCategories,
}