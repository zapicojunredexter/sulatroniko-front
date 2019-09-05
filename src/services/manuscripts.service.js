import RequestService from './request.service';
import { responseToJson } from '../utils/parsing.helper';
import { setManuscripts } from '../redux/manuscripts/manuscripts.action';

export default class Service {
    static fetchAll = () => async dispatch => {
        try {
            const results = await RequestService.get('manuscripts');
            const json = await responseToJson(results);
            dispatch(setManuscripts(json));
        } catch (err) {

        }
    }

    static edit = (params) => async (dispatch, getState) => {
        try {
            const { userStore: { uid } } = getState();
            const payload = {
                ...params,
                authorId: uid,
                status: 'unpublished',
            };
            console.log('eeeeeeeekkk', payload);;
            const results = await RequestService.patch(`manuscripts/${params.id}`,payload);
            await responseToJson(results);
        } catch (err) {

            console.error(err);
            throw err;
        }
    }

    static setFreeFields = (id, params) => async (dispatch, getState) => {
        try {
            const results = await RequestService.patch(`manuscripts/${id}`,params);
            await responseToJson(results);
        } catch (err) {

            console.error(err);
            throw err;
        }
    }

    static add = (params) => async (dispatch, getState) => {
        try {
            const { userStore: { uid } } = getState();
            const payload = {
                ...params,
                authorId: uid,
                status: 'unpublished',
            };
            const results = await RequestService.post('manuscripts',payload);
            await responseToJson(results);
            // dispatch(setManuscripts(json));
        } catch (err) {

            console.error(err);
            throw err;
        }
    }

    static requestTransaction = (manuscript, publisher) => async (dispatch, getState) => {

        try {
            const { userStore: { uid } } = getState();
            const payload = {
                manuscriptId: manuscript,
                publisherId: publisher,
                authorId: uid,
            };
            const results = await RequestService.post('proposals',payload);
            const json = await responseToJson(results);
            alert('success');
            return json;
        } catch (err) {

            // console.error('mierror', err);
            throw err;
        }
    }
};
