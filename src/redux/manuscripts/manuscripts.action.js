
export const SET_MANUSCRIPTS = 'SET_MANUSCRIPTS';

export const setManuscripts = manuscripts => dispatch =>
    dispatch({
        type: SET_MANUSCRIPTS,
        payload: {
            manuscripts
        }
    });