import { SET_PUBLISHERS } from './publishers.action';

const initialState = {
    publishers: [],
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PUBLISHERS:
            return {
                ...state,
                publishers: action.payload.authors,
            }
        default:
            return state;
    }
}