import RequestService from './request.service';
import { responseToJson } from '../utils/parsing.helper';
import { setAuthors } from '../redux/authors/authors.action';

export default class Service {
    static fetchAll = () => async dispatch => {
        try {
            const results = await RequestService.get('authors');
            const json = await responseToJson(results);
            dispatch(setAuthors(json));
        } catch (err) {

        }
    }

    static set = (id, params) => async dispatch => {
        try {
            const results = await RequestService.post(`authors/${id}`, params);
            console.log('EK', results, id, params);
            const json = await responseToJson(results);
            console.log('HOHOY', json);
            // dispatch(setAuthors(json));
        } catch (err) {
            throw err;
        }
    }
};
