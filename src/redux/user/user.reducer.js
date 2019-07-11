import { SET_UID, SET_IS_LOGGED_IN, SET_IS_LOGGED_OUT, SET_USER_DETAILS } from './user.action';

const initialState = {
    uid: null,
    isLoggedIn: false,
    type: '',
    user: null,
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
            return initialState;
        case SET_USER_DETAILS:
            return {
                ...state,
                type: action.payload.type,
                user: action.payload.user,
            }
        default:
            return state;
    }
}