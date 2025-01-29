import axios from "axios";

//withCredentials sends the cookie
export const axiosInstance = axios.create({
    baseURL: 'https://frontend-take-home-service.fetch.com', 
    withCredentials: true,
  });

