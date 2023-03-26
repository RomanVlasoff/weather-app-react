import _axios from 'axios';
// import store from '@/store'

const axios = _axios.create();

axios.interceptors.request.use(request => {
    return request;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    // store.commit('SET_ERROR', 'requestError')
    return Promise.reject(error);
});

export default axios;