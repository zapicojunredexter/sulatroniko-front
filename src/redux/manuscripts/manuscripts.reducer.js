import { SET_MANUSCRIPTS } from './manuscripts.action';

const initialState = {
    manuscripts: [],
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MANUSCRIPTS:
            return {
                ...state,
                manuscripts: action.payload.authors,
            }
        default:
            return state;
    }
}