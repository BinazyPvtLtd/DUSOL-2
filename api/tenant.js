import axios from "axios";
import { getBaseUrl, getTenantHost } from "@/constant/constant";

export const getTenantAPI = () => {
  return axios.get(`${getBaseUrl()}/home`, {
    headers: {
      "X-Tenant": getTenantHost(),
    },
  });
};
