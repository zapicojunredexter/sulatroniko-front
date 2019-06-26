
export const SET_AUTHORS = 'SET_AUTHORS';

export const setAuthors = authors => dispatch =>
    dispatch({
        type: SET_AUTHORS,
        payload: {
            authors
        }
    });