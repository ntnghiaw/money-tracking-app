const transactionApi = {
    getAllTransaction() {
        const url = '/transaction';
        return axiosClient.get(url);
    },
}

export default transactionApi;