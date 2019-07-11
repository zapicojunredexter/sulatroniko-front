import FirebaseClient from '../modules/FirebaseClient';

export default class Service {
    static uploadFile = (files) => async dispatch => {
        try {
            const tasksArray = files.map(file => new Promise((resolve, reject) => {
                const storageRef = FirebaseClient.instance.storage().ref(`user-uploads/${new Date().getTime()}-${file.name}`);
                storageRef.put(files[0]).then(() => resolve(storageRef)).catch(err => reject(err));
            }));
            const uploads = await Promise.all(tasksArray);
            const pathsTasksArray = uploads.map(file =>  new Promise((resolve, reject) => {
                resolve(file.getDownloadURL())
            }));
            const paths = await Promise.all(pathsTasksArray);
            return paths;
        } catch(err) {
            throw err;
        }
    }
};
