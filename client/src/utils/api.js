import axios from 'axios';

const baseUrl = 'http://localhost:5000/api';

// request interceptor to add the auth token header to requests
axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken');

    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post(`${baseUrl}/auth/refresh`, { refreshToken })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('accessToken', res.data.accessToken);
            console.log('Access token refreshed!');
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
