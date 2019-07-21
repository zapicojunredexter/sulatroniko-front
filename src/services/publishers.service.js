import RequestService from './request.service';
import { responseToJson } from '../utils/parsing.helper';
import { setPublishers } from '../redux/publishers/publishers.action';

export default class Service {
    static fetchAll = () => async dispatch => {
        try {
            const results = await RequestService.get('publishers');
            const json = await responseToJson(results);
            dispatch(setPublishers(json));
        } catch (err) {

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
            // alert('iedit dapat'+ JSON.stringify(payload));
            const results = await RequestService.post(`publishers/${uid}`,payload);
            const t = await responseToJson(results);
            alert('success');
            // dispatch(setManuscripts(json));
        } catch (err) {

            console.error(err);
            throw err;
        }
    }
};
