import RequestService from './request.service';

export default class Service {
    static fetchAll = () => async dispatch => {
        RequestService.get();
    }
};
