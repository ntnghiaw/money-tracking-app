import axiosClient from '../axios'


const categoryApi = {
    fetchCategories() {
        const url = '/categories';
        return axiosClient.get(url);
    },
};




export default categoryApi;