import { axiosInstance } from "./util";

export const postLogin = (body) => axiosInstance.post("/auth/login", body);
