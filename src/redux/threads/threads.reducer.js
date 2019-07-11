import { SET_THREADS } from './threads.action';

const initialState = {
    threads: [],
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_THREADS:
            return {
                ...state,
                threads: action.payload.threads,
            }
        default:
            return state;
    }
}