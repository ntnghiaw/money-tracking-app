
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.10'


export const apiConfig = {
  baseUrl: `${API_URL}/v1/api`,
  timeout: 20000,
  endpoints: {
    auth: '/auth',
    users: '/users',
    wallets: '/wallets',
    transactions: '/transactions',
    plans: '/plans',
    categories: '/categories',
  },
}
