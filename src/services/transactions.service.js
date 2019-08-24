import RequestService from './request.service';
import { responseToJson } from '../utils/parsing.helper';
import { setTransactions } from '../redux/transactions/transactions.action';

export default class Service {
    static fetchAll = () => async (dispatch, getState) => {
        try {
            const results = await RequestService.get('proposals');
            const json = await responseToJson(results);
            const { userStore: { uid } } = getState();
            const filtered = json.filter(transaction => transaction.authorId === uid || transaction.publisherId);
            dispatch(setTransactions(filtered));
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
                deleted: false,
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
    static deleteCard = (transactionId, cardId) => async (dispatch, getState) => {
        try {
            alert('idelete'+transactionId + "dasdas"+cardId)
            // const results = await RequestService.patch(`transactions/progress/${id}`,payload);
            // await responseToJson(results);
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
    static approveTransaction = (id) => async (dispatch, getState) => {
        try {
            const results = await RequestService.post(`transactions/approve/${id}`);
            const json = await responseToJson(results);
        } catch (err) {
            throw err;
        }
    }
    static assignCopywriter = (transactionId, params) => async (dispatch, getState) => {
        try {
            const results = await RequestService.post(`proposals/${transactionId}`, params);
            const json = await responseToJson(results);
        } catch (err) {
            throw err;
        }
    }
};
