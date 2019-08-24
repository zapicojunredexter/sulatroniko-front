import RequestService from './request.service';
import { responseToJson } from '../utils/parsing.helper';
import { setPublishers } from '../redux/publishers/publishers.action';

export default class Service {
    static fetchAll = () => async dispatch => {
        try {
            // const results = await RequestService.get('publishers');
            // const json = await responseToJson(results);
            // dispatch(setPublishers(json));
        } catch (err) {
            console.error(err);
        }
    }

    static fetchOne = (id) => async dispatch => {
        try {
            const results = await RequestService.get(`transactions/${id}`);
            const json = await responseToJson(results);
            return json;
        } catch (err) {
            console.error(err);
        }
    }


    static addCard = (id, params) => async (dispatch, getState) => {
        try {
            // const { userStore: { uid } } = getState();
            const payload = {
                ...params,
            };
            const results = await RequestService.post(`transactions/progress/${id}`,payload);
            await responseToJson(results);
            alert('success');
        } catch (err) {
            console.error(err);
        }
    }
    static editCard = (id, params) => async (dispatch, getState) => {
        try {
            // const { userStore: { uid } } = getState();
            const payload = {
                ...params,
            };
            const results = await RequestService.patch(`transactions/progress/${id}`,payload);
            await responseToJson(results);
        } catch (err) {
            console.error(err);
        }
    }
    static createTransaction = (params) => async (dispatch, getState) => {
        try {
            const { userStore: { uid } } = getState();
            const payload = {
                ...params,
                status: 'pending',
                authorId: uid,
            }
            const results = await RequestService.post(`proposals`,payload);
            const json = await responseToJson(results);
            return json;
        } catch (err) {
            console.error(err);
        }
    }
};
