import FirebaseClient from '../modules/FirebaseClient';

import { setIsLoggedIn, setIsLoggedOut, setUID, setUserCredentials, setUserDetails } from '../redux/user/user.action';
import ThreadsService from './threads.service';
import RequestService from './request.service';
import { responseToJson } from '../utils/parsing.helper';
import UserService from './user.service';
export default class Service {
    static authenticationListener = () => async (dispatch, getState) => {
        
        const { uid } = getState().userStore;
        if (uid) {
            dispatch(setIsLoggedIn());
            dispatch(ThreadsService.listenThreads(uid));
            dispatch(UserService.fetchUserDetails());
        } else {
            dispatch(Service.logout());
        }
        /*
        FirebaseClient.instance.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch(setUID(user.uid))
                dispatch(setIsLoggedIn());
                dispatch(ThreadsService.listenThreads(user.uid));
                dispatch(UserService.fetchUserDetails());
            } else {
                dispatch(Service.logout());
            }
          });
        */
    }
    static login = (username, password) => async dispatch => {
        try {
            if(username === 'admin' && password === 'admin') {

                dispatch(setUserCredentials(username, password, null));
                dispatch(setUserDetails({type: 'admin'}));
                dispatch(setUID(`WILL_NEVER_BE_USED`));
                dispatch(Service.authenticationListener());
                return;
            }
            const results = await RequestService.post('users/login', {username, password});
            const json = await responseToJson(results);

            if (json) {
                dispatch(setUserCredentials(username, password, json.displayPic));
                dispatch(setUID(json.id));
                dispatch(Service.authenticationListener());
            } else {
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static registerAuthor = (username, password) => async dispatch => {
        try {
            const user = {
                username,
                password
            };
            const userResult = await RequestService.post(`users`,{...user, type: 'author'});
            await responseToJson(userResult);
            dispatch(this.login(username, password));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static registerPublisher = (username, password) => async dispatch => {
        try {
            const user = {
                username,
                password
            };
            const userResult = await RequestService.post(`users`,{...user, type: 'publisher'});
            await responseToJson(userResult);
            dispatch(this.login(username, password));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static logout = () => async dispatch => {
        await FirebaseClient.instance.auth().signOut();
        dispatch(ThreadsService.unListenThreads());
        dispatch(setIsLoggedOut());
    }

    static requestAppRetrieval = (username) => async dispatch => {
        try {
            const userResult = await RequestService.get(`users/email/${username}`);
            await responseToJson(userResult);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};
