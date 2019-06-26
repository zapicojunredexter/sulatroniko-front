import { combineReducers } from 'redux';
import authorsStore from './authors/authors.reducer';
import manuscriptsStore from './manuscripts/manuscripts.reducer';
import publishersStore from './publishers/publishers.reducer';
import userStore from './user/user.reducer';

export default combineReducers({
    authorsStore,
    manuscriptsStore,
    publishersStore,
    userStore,
});