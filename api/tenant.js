import axios from "axios";
import { getBaseUrl } from "@/constant/constant";

export const getTenantAPI = () => {
  return axios.get(`${getBaseUrl()}/home`);
};
