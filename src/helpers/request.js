import fetch from 'isomorphic-fetch'

import {API_URL} from '../constants'

/**
 * Function to build request of any type with any parameters, including body.
 *
 * @param path Parameter, which defines concret path, which will be added to base api path
 * @param method One of the next: GET, POST, PUT, DELETE
 * @param data Data to put into body
 */
async function request(path, method, data) {
    const payload = data ? JSON.stringify(data) : null;
    const contentLength = payload ? payload.length.toString() : 0;

    let headers = {
        "Content-Type": "application/json",
        "Content-Length": contentLength,
    };

    const url = `${API_URL}/${path}`;
    let response = await fetch(url, {
        method: method,
        headers: headers,
        body: payload,
        mode: 'cors',
        cache: 'no-cache'
    });

    let responseData;
    try {
        responseData = await response.json();
    } catch (e) {
        console.debug("API client could not parse response body", response.status);
    }

    if (response.ok) {
        return {ok: true, data: responseData};
    } else if (response.status === 400 || response.status === 401) {
        return {ok: false, error: (responseData && responseData.message)};
    } else {
        throw new Error(responseData && responseData.message);
    }
}

/**
 * Outer interface to create post request
 *
 * @param path
 * @param data
 */
export async function post(path, data) {
    return await request(path, "POST", data);
}

/**
 * Outer interface to create put request
 *
 * @param path
 * @param data
 */
export async function put(path, data) {
    return await request(path, "PUT", data);
}

/**
 * Outer interface to create del request
 *
 * @param path
 * @param data
 */
export async function del(path, data) {
    return await request(path, "DELETE", data);
}

/**
 * Outer interface to create get request
 *
 * @param path
 * @param query An object of key-value pairs, which need to be converted into query params
 */
export async function get(path, query) {
    let queryString = "";
    if (query) {
        queryString += "?";
        let keys = Object.keys(query);
        for (let i = 0; i < keys.length; i++) {
            queryString += `${keys[i]}=${query[keys[i]]}`;
            if (i < keys.length - 1) queryString += "&";
        }
    }

    return await request(path + queryString, "GET");
}