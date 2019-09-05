import RequestService from './request.service';
import { responseToJson } from '../utils/parsing.helper';
import { setUserDetails, setUserCredentials } from '../redux/user/user.action';

export default class Service {

    static rateUser = params => async (dispatch, getState) => {
        try {
            const { uid } = getState().userStore;
            const payload = {
                ...params,
                reviewerId: uid,
            };
            const results = await RequestService.post(`reviews`, payload);
            await responseToJson(results);
        } catch (err) {
            throw err;
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
