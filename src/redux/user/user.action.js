
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_IS_LOGGED_OUT = 'SET_IS_LOGGED_OUT';

export const setIsLoggedIn = () => dispatch =>
    dispatch({
        type: SET_IS_LOGGED_IN,
    });

export const setIsLoggedOut = () => dispatch =>
    dispatch({
        type: SET_IS_LOGGED_OUT,
        payload: {qwe :true}
    });
