
export const SET_THREADS = 'SET_THREADS';

export const setThreads = threads => dispatch =>
    dispatch({
        type: SET_THREADS,
        payload: {
            threads
        }
    });