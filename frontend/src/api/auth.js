import axiosClient from "./axios";

const authApi  = {
    signup(data) {
        const url = '/signup';
        return axiosClient.post(url, data);
    },
    login(data) {
        const url = '/login';
        return axiosClient.post(url, data);
    },
    logout,
};

export default authApi;