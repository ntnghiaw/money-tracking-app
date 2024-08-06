import {
  fetchCategoriesPending,
  fetchCategoriesSuccess,
  fetchCategoriesError,
} from '../../redux/actions/categoriesActions'

const URL = process.env.EXPO_PUBLIC_API_URL

function fetchUserInfo() {
  return (dispatch) => {
    dispatch(fetchCategoriesPending())
    fetch(`${URL}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error
        }
        dispatch(fetchCategoriesSuccess(res.metadata.categories))
        return res.metadata.categories
      })
      .catch((error) => {
        dispatch(fetchProductsError(error))
      })
  }
}

export { fetchCategories }
