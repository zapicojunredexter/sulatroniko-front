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

    static requestTransaction = (manuscript, publisher) => dispatch => {

        try {
            console.log('harhar', manuscript, publisher);
        } catch (err) {

            // console.error('mierror', err);
            throw err;
        }
    }
};
