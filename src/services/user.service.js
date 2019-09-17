import RequestService from './request.service';
import { responseToJson } from '../utils/parsing.helper';
import { setUserDetails, setUserCredentials } from '../redux/user/user.action';

export default class Service {

    static setUser = (id, params) => async (dispatch, getState) => {
        try {
            const results = await RequestService.post(`users/${id}`, params);
            return results;
        } catch (err) {
            throw err;
        }
    }

    static fetchUserDetails = () => async (dispatch, getState) => {
        try {
            const { uid } = getState().userStore;
            const results = await RequestService.get(`users/${uid}`);

            const json = await responseToJson(results);
            if(json.type === 'author') {
                const authorResult = await RequestService.get(`authors/${uid}`);
                const author = await responseToJson(authorResult).catch((err) => console.error(err));
                dispatch(setUserDetails({type: json.type, user: {...author,status: json.status}}));
            }
            if(json.type === 'publisher') {
                const publisherResult = await RequestService.get(`publishers/${uid}`);
                const publisher = await responseToJson(publisherResult).catch((err) => console.error(err));
                console.log('AYYY', json, publisher);
                dispatch(setUserDetails({type: json.type, user: {...publisher, status: json.status}}));
            }
            if(json.type === 'copywriter') {
                const publisherResult = await RequestService.get(`copywriters/${uid}`);
                const publisher = await responseToJson(publisherResult).catch((err) => console.error(err));
                dispatch(setUserDetails({type: json.type, user: publisher}));
            }
        } catch (err) {
            console.error(err);
        }
    }

    static fetchAllUserTypes = () => async (dispatch, getState) => {
        try {
            const results = await RequestService.get(`users/multiple`);

            const json = await responseToJson(results);
            return json;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static setPublisher = params => async (dispatch, getState) => {
        try {
            const { uid } = getState().userStore;
            const results = await RequestService.post(`users/${uid}`);

            const json = await responseToJson(results);
            dispatch(setUserDetails({type: json.type, user: null}));
            // dispatch(setPublishers(json));
        } catch (err) {

        }
    }

    static setAuthor = params => async (dispatch, getState) => {
        try {
            const { uid } = getState().userStore;
            const results = await RequestService.post(`authors/${uid}`, params);

            await responseToJson(results);
            dispatch(setUserDetails({type: 'author', user: params}));
            dispatch(Service.fetchUserDetails());
            // dispatch(setPublishers(json));
        } catch (err) {
            console.error(err);
        }
    }


    static updateProfileImageUrl = displayPic => async (dispatch, getState) => {
        try {
            const { uid, credentials } = getState().userStore;
            const results = await RequestService.post(`users/${uid}`, { displayPic });
            await responseToJson(results);
            dispatch(setUserCredentials(credentials.username,credentials.password,displayPic));
            // dispatch(setPublishers(json));
        } catch (err) {
            console.error(err);
        }
    }

    static setNotifIsRead = id => async (dispatch, getState) => {
        try {
            const { uid } = getState().userStore;
            const results = await RequestService.get(`users/notifs/${uid}/${id}`);
            await responseToJson(results);
            // dispatch(setPublishers(json));
        } catch (err) {
            console.error(err);
        }
    }
};
