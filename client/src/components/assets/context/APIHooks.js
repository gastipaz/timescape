import axios from 'axios'

export async function postData(url, data) {
    const config = {withCredentials: true, headers: {'Content-Type': 'application/json', Accept: 'application/json'}};
    const result = await axios.post(`https://timescape-ep.herokuapp.com${url}`, data, config);
    return result
};

export async function getData(url) {
    const config = {withCredentials: true};
    const result = await axios.get(`https://timescape-ep.herokuapp.com${url}`, config);
    return result
}