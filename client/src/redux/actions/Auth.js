import axios from 'axios';
import { SEND_FORGET_PASSWORD_EMAIL, UPDATE_AUTH_USER, UPDATE_LOAD_USER } from './ActionTypes';

const header = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};
const API = 'localhost:5000';
console.log('env', process.env.REACT_APP_api)

export const signin = user => {
  return axios.post(`${API}/signin`, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(user)
  })
    .then(response => {
    console.log("🚀 ~ file: Auth.js ~ line 18 ~ response", response)
      return response.json();
    })
    .catch(err => console.log(err));
};
