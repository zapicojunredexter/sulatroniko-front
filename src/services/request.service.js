import config from '../config/config';

export default class Service {
    static get = (path) => {
        return fetch(`${config.api_url}/${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    
    static post = (path, body = {}) => {
        return fetch(`${config.api_url}/${path}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    static put = (path, body = {}) => {
        return fetch(`${config.api_url}/${path}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    static patch =  (path, body = {}) => {
        return fetch(`${config.api_url}/${path}`, {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
};
