import RequestService from './request.service';
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
            console.log('naad ni sha', userJson);
            const copywriterResult = await RequestService.post(`copywriters/${userJson.id}`,{...copywriter, publisherId: uid});
            const copywriterJson = await responseToJson(copywriterResult);
            console.log('naad ni sha1', copywriterJson);
            
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
                copywriter: params.copywriter,
                user: params.user,
                publisherId: uid,
            };
            // alert('iedit dapat'+ JSON.stringify(payload));
            const results = await RequestService.patch(`copywriters/${uid}`,payload);
            const t = await responseToJson(results);
            console.log('success', t);
            // dispatch(setManuscripts(json));
        } catch (err) {

            console.error(err);
            throw err;
        }
    }
};
