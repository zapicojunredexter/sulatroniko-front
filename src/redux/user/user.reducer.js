import { SET_IS_LOGGED_IN, SET_IS_LOGGED_OUT } from './user.action';

const initialState = {
    isLoggedIn: true,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: true,
            }
        case SET_IS_LOGGED_OUT:
            return {
                ...state,
                isLoggedIn: false,
            }
        default:
            return state;
    }
}