/*
 * src/store.js
 * With initialState
*/
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from './reducer';


const logger = createLogger({
    // predicate, // if specified this function will be called before each action is processed with this middleware.
    collapsed: (getState, action, logEntry) => !logEntry.error,
    duration: false, // print the duration of each action?
    timestamp: true, // print the timestamp with each action?
  
    // level = 'log': 'log' | 'console' | 'warn' | 'error' | 'info', // console's level
    // colors: ColorsObject/, // colors for title, prev state, action and next state: https://github.com/evgenyrodionov/redux-logger/blob/master/src/defaults.js#L12-L18
    // titleFormatter, // Format the title used when logging actions.
  
    // stateTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
    // actionTransformer, // Transform action before print. Eg. convert Immutable object to plain JSON.
    // errorTransformer, // Transform error before print. Eg. convert Immutable object to plain JSON.
  
    // logger = console: LoggerObject, // implementation of the `console` API.
    logErrors: true, // should the logger catch, log, and re-throw errors?
  
    diff: true, // (alpha) show diff between states?
    // diffPredicate // (alpha) filter function for showing states diff, similar to `predicate`
});


let middleware = null;

middleware = applyMiddleware(...[thunk, logger]);

const persistConfig = {
    key: 'root',
    storage,
}
  
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
    persistedReducer,
    {},
    middleware
 );

 const persistor = persistStore(store);

 export { store, persistor };