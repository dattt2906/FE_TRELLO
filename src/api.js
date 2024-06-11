import axios from 'axios';


const Api = (token) => {
    


  const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
     
    },
  });

  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return api;


};

export default Api;