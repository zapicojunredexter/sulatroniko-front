
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';

export const setTransactions = transactions => dispatch =>
    dispatch({
        type: SET_TRANSACTIONS,
        payload: {
            transactions
        }
    });