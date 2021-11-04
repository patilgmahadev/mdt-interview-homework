import axios from "axios";
import { ENDPOINTS } from "../Constants";

export default function LoginApi(payload) {
  return axios.post(ENDPOINTS.login, payload);
}
