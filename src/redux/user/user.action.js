
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_IS_LOGGED_OUT = 'SET_IS_LOGGED_OUT';
export const SET_UID = 'SET_UID';

export const setUID = uid => dispatch =>
    dispatch({
        type: SET_UID,
        payload: {
            uid
        }
    });
export const setIsLoggedIn = () => dispatch =>
    dispatch({
        type: SET_IS_LOGGED_IN,
    });

export const setIsLoggedOut = () => dispatch =>
    dispatch({
        type: SET_IS_LOGGED_OUT,
    });
