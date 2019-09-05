import RequestService from './request.service';
import { responseToJson } from '../utils/parsing.helper';
export default class Service {
    // params = message, title
    static sendNotif = async (recipientId, params) =>  {
        try {
            const results = await RequestService.post(`users/notifs/${recipientId}`, params);
            await responseToJson(results);
            // dispatch(setPublishers(json));
        } catch (err) {
            console.error(err);
        }
    }
};
