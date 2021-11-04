import axios from "axios";
import { ENDPOINTS } from "../Constants";

export function balancesApi() {
  return axios.get(ENDPOINTS.balances);
}

export function transactionsApi() {
  return axios.get(ENDPOINTS.transactions);
}

export function payeeApi() {
  return axios.get(ENDPOINTS.payees);
}


export function transferApi(payload) {
  return axios.post(ENDPOINTS.transfer, payload);
}
