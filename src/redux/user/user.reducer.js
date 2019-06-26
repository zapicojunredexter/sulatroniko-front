import { SET_UID, SET_IS_LOGGED_IN, SET_IS_LOGGED_OUT } from './user.action';

const initialState = {
    uid: null,
    isLoggedIn: false,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_UID:
            return {
                ...state,
                uid: action.payload.uid,
            }
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