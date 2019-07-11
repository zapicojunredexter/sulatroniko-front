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
};