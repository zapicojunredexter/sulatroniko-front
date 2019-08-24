import { SET_TRANSACTIONS } from './transactions.action';

const initialState = {
    transactions: [],
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload.transactions,
            }
        default:
            return state;
    }
}