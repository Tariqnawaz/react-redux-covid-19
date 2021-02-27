import axios from 'axios';

let axiosInstance = axios.create({
    baseURL: 'https://covid-193.p.rapidapi.com',
    headers: {
        'x-rapidapi-key': 'cdbdef94d1mshc01845a1be0a45fp10d95bjsnde286db7a7e1',
        'x-rapidapi-host': 'covid-193.p.rapidapi.com',
        "useQueryString": true
    }
});

// axiosInstance.interceptors.request.use(request => {
//     console.log('Starting Request', JSON.stringify(request.url, null, 2))
//     return request
// });
// axiosInstance.interceptors.response.use(response => {
//     console.log('Response:', JSON.stringify(response.statusText, null, 2))
//     return response
// });


export default axiosInstance;