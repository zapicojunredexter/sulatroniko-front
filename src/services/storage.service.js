import FirebaseClient from '../modules/FirebaseClient';

export default class Service {
    static uploadFile = (files) => async dispatch => {
        try {
            const tasksArray = files.map(file => new Promise((resolve, reject) => {
                const storageRef = FirebaseClient.instance.storage().ref(`user-uploads/${new Date().getTime()}-${file.name}`);
                storageRef.put(files[0]).then(() => resolve(true)).catch(err => reject(err));
            }));
            await Promise.all(tasksArray);
        } catch(err) {
            throw err;
        }
    }
};
