import axios from "axios";
import isEmpty from "lodash/isEmpty";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (!isEmpty(token)) {
    config.headers["Authorization"] = token;
  }
  config.headers["Content-Type"] = "application/json";
  config.headers["Accept"] = "application/json";

  return config;
});
