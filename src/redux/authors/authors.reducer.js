import { SET_AUTHORS } from './authors.action';

const initialState = {
    authors: [],
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHORS:
            return {
                ...state,
                authors: action.payload.authors,
            }
        default:
            return state;
    }
}