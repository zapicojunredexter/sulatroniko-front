import RequestService from './request.service';
import UserService from './user.service';
import { responseToJson } from '../utils/parsing.helper';
import { setCopywriters } from '../redux/copywriters/copywriters.action';

export default class Service {
    static fetchAll = () => async (dispatch, getState) => {
        try {
            const state = getState();
            // const results = await RequestService.get(`copywriters/publishers/${state.userStore.uid}`);
            const results = await RequestService.get(`copywriters`);
            const json = await responseToJson(results);
            dispatch(setCopywriters(json));
        } catch (err) {

        }
    }


    static add = (params) => async (dispatch, getState) => {
        try {
            const { userStore: { uid } } = getState();
            const { user, copywriter } = params;

            const userResult = await RequestService.post(`users`,{...user, type: 'copywriter'});
            const userJson = await responseToJson(userResult);
            const copywriterResult = await RequestService.post(`copywriters/${userJson.id}`,{...copywriter, publisherId: uid});
            const copywriterJson = await responseToJson(copywriterResult);
            
        } catch (err) {

            console.error(err);
            throw err;
        }
    }

    static setCopywriter = (params) => async (dispatch, getState) => {
        try {
            const { userStore: { uid } } = getState();
            const payload = {
                ...params,
                // copywriter: params.copywriter,
                // user: params.user,
                // publisherId: uid,
            };
            // alert('iedit dapat'+ JSON.stringify(payload));
            const results = await RequestService.patch(`copywriters/${uid}`,payload);
            const t = await responseToJson(results);
            
            dispatch(UserService.fetchUserDetails());
            // dispatch(setManuscripts(json));
        } catch (err) {

            console.error(err);
            throw err;
        }
    }


    static editCopywriter = (id, payload) => async (dispatch, getState) => {
        try {
            const results = await RequestService.patch(`copywriters/${id}`,payload);
            const t = await responseToJson(results);
            
            dispatch(UserService.fetchUserDetails());
            // dispatch(setManuscripts(json));
        } catch (err) {

            console.error(err);
            throw err;
        }
    }
};
