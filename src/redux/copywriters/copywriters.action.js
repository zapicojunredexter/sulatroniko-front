
export const SET_COPYWRITERS = 'SET_COPYWRITERS';

export const setCopywriters = copywriters => dispatch =>
    dispatch({
        type: SET_COPYWRITERS,
        payload: {
            copywriters
        }
    });