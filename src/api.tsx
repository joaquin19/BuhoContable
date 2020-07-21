import Axios from 'axios'
import { getState, getStore } from './store';

export const { apiUrl } = window['runConfig'];
export const url = apiUrl;

export const GET = async ({ target, body = null }) => {
    let response: any;
    if (body) {
        let params = new URLSearchParams(body).toString();
        response = await Axios.get(`${url}${target}?${params}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }).catch(error => {
                if (error.response.status === 401) getStore().dispatch({ type: 'LOGOUT' });
            });
    } else {
        response = await Axios.get(`${url}${target}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }).catch(error => {
                if (error.response.status === 401) getStore().dispatch({ type: 'LOGOUT' });
            });
    }
    return response.data;
}

export const POST = async ({ target, body, toUrl = false, responseType = false }) => {
    let response;
    if (toUrl) {
        let params = new URLSearchParams(body).toString();
        response = await Axios.post(`${url}${target}?${params}`,
            JSON.stringify(body),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                }
            }
        ).catch(error => {
            if (error.response.status === 401) getStore().dispatch({ type: 'LOGOUT' });
        });
    } else if (responseType) {
        response = await Axios.post(
            `${url}${target}`,
            JSON.stringify(body),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                responseType: 'blob'
            }
        ).catch(error => {
            if (error.response.status === 401) getStore().dispatch({ type: 'LOGOUT' });
        });
    } else {
        response = await Axios.post(
            `${url}${target}`,
            JSON.stringify(body),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
            }
        ).catch(error => {
            if (error.response.status === 401) getStore().dispatch({ type: 'LOGOUT' });
        });
    }

    return response.data;
}

export const PUT = async ({ target, body }) => {
    let response: any;
    response = await Axios.put(
        `${url}${target}`,
        JSON.stringify(body),
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        }).catch(error => {
            if (error.response.status === 401) getStore().dispatch({ type: 'LOGOUT' });
        });
    return response;
}

export const DELETE = async ({ target, body, toUrl = false }) => {
    let response: any;
    if (toUrl) {
        let params = new URLSearchParams(body).toString();
        response = await Axios.delete(
            `${url}${target}?${params}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                }
            }
        ).catch(error => {
            if (error.response.status === 401) getStore().dispatch({ type: 'LOGOUT' });
        });
    } else {
        response = await Axios.delete(
            `${url}${target}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                },
                data: body
            }
        ).catch(error => {
            if (error.response.status === 401) getStore().dispatch({ type: 'LOGOUT' });
        });
    }
    return response;
}

export const MEDIA = async ({ target, body, method = 'POST' }) => {
    let response;
    if (method === 'POST') {
        response = await Axios.post(
            `${url}${target}`,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            }
        ).catch(error => {
            if (error.response.status === 401) getStore().dispatch({ type: 'LOGOUT' });
        });
    } else if (method === 'PUT') {
        response = await Axios.put(
            `${url}${target}`,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            }
        ).catch(error => {
            if (error.response.status === 401) getStore().dispatch({ type: 'LOGOUT' });
        });
    }
    return response.data;
}

const getToken = () => {
    var state = getState();
    //return state.auth.token;
    return 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkM2NIVUVibVJoc1EzeXhNbzV2VnliSTFzaDZCSDJZRCIsImlhdCI6MTU4NTkzMjYzNDU0OH0.tMSht_M3ryQl5IqCirhYR1gb8j3FQ26vILT4Qpx4XrdFz - zUmqbgFYiKTaZHPpB85etRIMhxVoZf6tOrHy0fnA';
}
