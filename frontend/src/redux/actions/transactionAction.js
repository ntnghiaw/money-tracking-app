
export const read = (transaction) => ({
    type: 'READ',
    payload: transaction,
  });

export const changeType = (type) => {
  return {
    type: 'CHANGE_TYPE',
    payload: type,
  };  
}

export const getCategory = (category) => ({
  type: 'GET_CATEGORY',
  payload: category,
});

export const getCurrentScreen = (screen) => ({
  type: 'GET_CURRENT_SCREEN',
  payload: screen
})