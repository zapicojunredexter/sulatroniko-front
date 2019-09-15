import genres from './genres';
const initialState = {
    genres: genres,
};
export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}