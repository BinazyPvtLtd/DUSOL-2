// src/api/tenant.js

import axios from "axios";

const API = process.env.NEXT_PUBLIC_DEFAULT_API;

export const getTenantAPI = () => {
    return axios.get(`${API}/home`);
};