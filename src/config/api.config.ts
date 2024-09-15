import wallets from "../app/(authenticated)/(tabs)/home/wallets"

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000'

export const apiConfig = {
 baseUrl: `${API_URL}/v1/api`,
 timeout: 5000,
 endpoints: {
   auth: '/auth',
   users: '/users',
   wallets: '/wallets',
   transactions: '/transactions',
   plans: '/plans',
   
 }
}