import RequestService from './request.service';
import { responseToJson } from '../utils/parsing.helper';
import { setPublishers } from '../redux/publishers/publishers.action';
import UserService from './user.service';

export default class Service {
    static fetchAll = () => async dispatch => {
        try {
            const results = await RequestService.get('publishers');
            const json = await responseToJson(results);
            dispatch(setPublishers(json));
        } catch (err) {

        }
    }

    static approvePublisher = (id) => async dispatch => {
        try {
            const payload = {
                status: 'approved',
            };
            const results = await RequestService.post(`publishers/${id}`,payload);
            await responseToJson(results);
        } catch (err) {
            throw err;
        }
    }

    static setPublisher = (params) => async (dispatch, getState) => {
        try {
            const { userStore: { uid } } = getState();
            const payload = {
                ...params,
                copywriter: params.copywriter,
                user: params.user,
                publisherId: uid,
            };
            console.log(
                'HEYYY', payload
            );
            return;
            const results = await RequestService.post(`publishers/${uid}`,payload);
            const t = await responseToJson(results);
            dispatch(UserService.fetchUserDetails());
        } catch (err) {

            console.error(err);
            throw err;
        }
    }
};
