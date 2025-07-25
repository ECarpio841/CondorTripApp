import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.1.69:8080', // ⚠️ Usa tu IP local, NO localhost
  headers: {
    'Content-Type': 'application/json'
  }
});
