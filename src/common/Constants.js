
const API_URL = 'http://localhost:8080/'

export const ENDPOINTS = {
    login: `${API_URL}authenticate/login`,
    balances: `${API_URL}account/balances`,
    transactions: `${API_URL}account/transactions`,
    payees: `${API_URL}account/payees`,
    transfer: `${API_URL}transfer`,
}