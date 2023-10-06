import axios from 'axios';

export const apiLogin = (params) => {
  axios.post('http://localhost:3001/login', params)
}
