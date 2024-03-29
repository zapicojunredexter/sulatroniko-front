import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authorsStore from './authors/authors.reducer';
import manuscriptsStore from './manuscripts/manuscripts.reducer';
import publishersStore from './publishers/publishers.reducer';
import userStore from './user/user.reducer';
import threadsStore from './threads/threads.reducer';
import copywriterStore from './copywriters/copywriters.reducer';
import transactionsStore from './transactions/transactions.reducer';
import genresStore from './genres/genres.reducer';

const userPersistConfig = {
    key: 'userStore',
    storage,
};

export default combineReducers({
    authorsStore,
    manuscriptsStore,
    publishersStore,
    threadsStore,
    copywriterStore,
    transactionsStore,
    genresStore,
    userStore: persistReducer(userPersistConfig, userStore),
});