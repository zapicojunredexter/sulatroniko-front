import FirebaseClient from '../modules/FirebaseClient';

import { setIsLoggedIn, setIsLoggedOut, setUID } from '../redux/user/user.action';
import ThreadsService from './threads.service';
export default class Service {
    static authenticationListener = () => async dispatch => {
        FirebaseClient.instance.auth().onAuthStateChanged(function(user) {
            if (user) {
                dispatch(setUID(user.uid))
                dispatch(setIsLoggedIn());
                dispatch(ThreadsService.listenThreads(user.uid));
            } else {
                dispatch(Service.logout());
            }
          });
    }
    static login = (email, password) => async dispatch => {
        try {
            await FirebaseClient.instance.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error(error);
        }
    }

    static registerAuthor = (email, password) => async dispatch => {
        try {
            await FirebaseClient.instance.auth().createUserWithEmailAndPassword(email, password);
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
