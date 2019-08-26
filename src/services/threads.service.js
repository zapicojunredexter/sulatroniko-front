import FirebaseClient from '../modules/FirebaseClient';
import { setThreads, setThreadContact } from '../redux/threads/threads.action';
import RequestService from './request.service';
import StorageService from './storage.service';
import { responseToJson } from '../utils/parsing.helper';

export default class Service {
    threadsListener;

    static fetchThreadMembers = (memberIds) => async (dispatch, getState) => {
        try {
            // const state = getState();
            const results = await RequestService.post('users/multiple', { userIds: memberIds });
            const json = await responseToJson(results);
            json.forEach(user => {
                dispatch(setThreadContact(user.id, user));
            })
        } catch (err) {
            console.error(err);
        }
    }

    static listenThreads = (uid) => async dispatch => {

        dispatch(this.unListenThreads());
        this.threadsListener = FirebaseClient.instance
            .firestore()
            .collection('threads')
            // .where('isDeleted', '==', false)
            .where('memberIds', 'array-contains', uid)
            .onSnapshot(data => {
                    const threads = data.docs.map(data => ({id: data.id, ...data.data()}));
                    dispatch(setThreads(threads));
                    threads.forEach((thread) => {
                        dispatch(Service.fetchThreadMembers(thread.memberIds));
                    });
                }
            );
    }

    static unListenThreads = () => async dispatch => {
        if(this.threadsListener) {
            this.threadsListener();
        }
    }

    static createThread = (otherUserId) => async (dispatch, getState) => {
        try {

            const { userStore: { uid } } = getState();
            const memberIds = [uid, otherUserId];
            const payload = {
                memberIds,

            };
            const results = await RequestService.post('threads', payload);
            const json = await responseToJson(results);
            alert('success');
            return json;
        } catch (err) {
            console.error(err);
        }
    }

    static sendMessage = (params) => async (dispatch, getState) => {
        try {

            const { userStore: { uid } } = getState();
            const files = params.files ? Object.values(params.files) : [];
            
            const fileUrls = await dispatch(StorageService.uploadFile(files));
            const payload = {
                message: params.message,

                fileUrls,
                userId: uid,
            }
            const results = await RequestService.post(`threads/${params.threadId}`, payload);
            const json = await responseToJson(results);
            alert('success');

        } catch (err) {
            console.error(err);
        }
    }

    static editThread = (id, params) => async (dispatch, getState) => {
        try {
            const results = await RequestService.patch(`threads/${id}`, params);
            const json = await responseToJson(results);
        } catch (err) {
            console.error(err);
        }
    }
};
