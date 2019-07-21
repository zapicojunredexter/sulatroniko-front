
export const SET_THREADS = 'SET_THREADS';

export const SET_THREAD_CONTACT = 'SET_THREAD_CONTACT';

export const setThreads = threads => dispatch =>
    dispatch({
        type: SET_THREADS,
        payload: {
            threads
        }
    });

export const setThreadContact = (key, contact) => dispatch =>
    dispatch({
        type: SET_THREAD_CONTACT,
        payload: {
            key,
            contact
        }
    });