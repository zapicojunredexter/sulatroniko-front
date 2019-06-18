import { setIsLoggedIn, setIsLoggedOut } from '../redux/user/user.action';
export default class Service {
    static login = (username, password) => async dispatch => {
        dispatch(setIsLoggedIn());
    }

    static logout = (username, password) => async dispatch => {
        dispatch(setIsLoggedOut());
    }
};
