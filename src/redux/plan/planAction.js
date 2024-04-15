
export const period = (period) => ({
    type: 'CHANGE_PERIOD',
    payload: period,
});

export const createBudget = (budget) => ({
    type: 'CREATE_BUDGET',
    payload: budget,
});

export const type = (type) => {
    return {
        type: 'CHANGE_TYPE',
        payload: type,
    }
}

export const addAmount = (amount) => ({
    type: 'ADD_AMOUNT',
    payload: amount
})
