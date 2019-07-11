import RequestService from './request.service';
import { responseToJson } from '../utils/parsing.helper';
import { setUserDetails } from '../redux/user/user.action';

export default class Service {
    static fetchUserDetails = () => async (dispatch, getState) => {
        try {
            const { uid } = getState().userStore;
            const results = await RequestService.get(`users/${uid}`);

            const json = await responseToJson(results);
            if(json.type === 'author') {
                const authorResult = await RequestService.get(`authors/${uid}`);
                const author = await responseToJson(authorResult).catch((err) => console.error(err));
                dispatch(setUserDetails({type: json.type, user: author}));
            }
            if(json.type === 'publisher') {
                const publisherResult = await RequestService.get(`publishers/${uid}`);
                const publisher = await responseToJson(publisherResult).catch((err) => console.error(err));
                dispatch(setUserDetails({type: json.type, user: publisher}));
            }
        } catch (err) {
            console.error(err);
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
            // dispatch(setPublishers(json));
        } catch (err) {
            console.error(err);
        }
    }
};