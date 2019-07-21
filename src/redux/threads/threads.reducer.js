import { SET_THREADS, SET_THREAD_CONTACT } from './threads.action';

const initialState = {
    threads: [],
    contacts: {},
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_THREADS:
            return {
                ...state,
                threads: action.payload.threads,
            }
        case SET_THREAD_CONTACT:
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    [action.payload.key]: action.payload.contact,
                }
            }

        default:
            return state;
    }
}