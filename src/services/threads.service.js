import FirebaseClient from '../modules/FirebaseClient';

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
                    console.log('ARA AY', data.docs.map(data => data.data()));
                }
            );
    }

    static unListenThreads = () => async dispatch => {
        if(this.threadsListener) {
            this.threadsListener();
        }
    }
};
