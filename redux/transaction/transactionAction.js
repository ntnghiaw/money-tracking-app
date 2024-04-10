
export const read = (transaction) => ({
    type: 'READ',
    payload: transaction,
  });

export const changeType = (type) => ({
  type: 'CHANGE_TYPE',
  payload: type,
});

export const getCategory = (category) => ({
  type: 'GET_CATEGORY',
  payload: category,
});
  