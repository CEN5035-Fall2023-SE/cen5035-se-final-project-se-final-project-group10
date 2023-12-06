import axios from 'axios';
import {BASE_URL} from './Constants';

const AxiosFetchPost = (url, body, headers) => {
    const response = {
        data:'',
        error:''
    }
    return axios.post(BASE_URL+url, body, headers)
          .then(resp => {
            response.data = resp.data;
            return response;
          })
          .catch(error => {
              response.error = error;
              return response;
          });

}

export const AxiosFetchGet = (url, header) => {
    const response = {
        data:'',
        error:''
    }
    return axios.get(BASE_URL+url, header)
        .then(resp => {
            response.data = resp.data;
            return response;
        })
        .catch(error => {
            response.error = error;
            return response;
        });
}

export const AxiosFetchPut = (url, body, header) => {
    const response = {
        data:'',
        error:''
    }
    return axios.put(BASE_URL+url, body, header)
        .then(resp => {
            response.data = resp.data;
            return response;
        })
        .catch(error => {
            response.error = error;
            return response;
        });
}

export default AxiosFetchPost;