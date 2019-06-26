import { api_url } from '../config/config';
export default class Service {
    static get = () => async dispatch => {
        console.log('api_url', api_url);
    }
    static post = () => async dispatch => {
    }
    static put = () => async dispatch => {
    }
};
