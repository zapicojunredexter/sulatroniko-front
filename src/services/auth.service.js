import FirebaseClient from '../modules/FirebaseClient';

import { setIsLoggedIn, setIsLoggedOut, setUID } from '../redux/user/user.action';
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
            console.log('heyy', username, password);
            const results = await RequestService.post('users/login', {username, password});
            const json = await responseToJson(results);

            if (json) {
                dispatch(setUID(json.id));
                dispatch(Service.authenticationListener());
            } else {
            }
            // await FirebaseClient.instance.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static registerAuthor = (email, password) => async dispatch => {
        try {
            // await FirebaseClient.instance.auth().createUserWithEmailAndPassword(email, password);
            // console.log('registered',result);
            // dispatch(setIsLoggedIn());
        } catch (error) {
            console.error(error);
        }
    }

    static logout = () => async dispatch => {
        await FirebaseClient.instance.auth().signOut();
        dispatch(ThreadsService.unListenThreads());
        dispatch(setIsLoggedOut());
    }
};
