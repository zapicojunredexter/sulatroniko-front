import FirebaseClient from '../modules/FirebaseClient';
import { setThreads } from '../redux/threads/threads.action';

export default class Service {
    threadsListener;

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
                }
            );
    }

    static unListenThreads = () => async dispatch => {
        if(this.threadsListener) {
            this.threadsListener();
        }
    }
};
