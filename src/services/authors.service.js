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
};
