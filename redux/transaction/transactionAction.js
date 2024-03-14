
export const read = (transaction) => ({
    type: 'READ',
    payload: transaction,
  });

  export const changeType = (type) => ({
    type: 'CHANGE_TYPE',
    payload: type,
  });
  
  
