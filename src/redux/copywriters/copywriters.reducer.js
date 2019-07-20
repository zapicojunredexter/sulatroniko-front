import { SET_COPYWRITERS } from './copywriters.action';

const initialState = {
    copywriters: [],
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_COPYWRITERS:
            return {
                ...state,
                copywriters: action.payload.copywriters,
            }
        default:
            return state;
    }
}