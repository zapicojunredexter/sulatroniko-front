
export const SET_PUBLISHERS = 'SET_PUBLISHERS';

export const setPublishers = publishers => dispatch =>
    dispatch({
        type: SET_PUBLISHERS,
        payload: {
            publishers
        }
    });