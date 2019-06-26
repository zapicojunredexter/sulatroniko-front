import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authorsStore from './authors/authors.reducer';
import manuscriptsStore from './manuscripts/manuscripts.reducer';
import publishersStore from './publishers/publishers.reducer';
import userStore from './user/user.reducer';


const userPersistConfig = {
    key: 'userStore',
    storage,
};

export default combineReducers({
    authorsStore,
    manuscriptsStore,
    publishersStore,
    userStore: persistReducer(userPersistConfig, userStore),
});