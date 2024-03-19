import Axios, { Method } from "axios";

const BASE_URL: string =
  process.env.NODE_ENV === "production" ? "/api/" : "//localhost:3030/api/";

const axios = Axios.create({
  withCredentials: true,
});

export interface IHttpService {
  get(endpoint: string, data?: any): Promise<any>;
  post(endpoint: string, data?: any): Promise<any>;
  put(endpoint: string, data: any): Promise<any>;
  delete(endpoint: string, data?: any): Promise<any>;
}

export const httpService: IHttpService = {
  get(endpoint, data) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint, data) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint, data) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, "DELETE", data);
  },
};

async function ajax(endpoint: string, method: Method = "GET", data: any = null): Promise<any> {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === "GET" ? data : null,
    });
    return res.data;
  } catch (err: any) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `,
      data
    );
    console.dir(err);
    if (err.response && err.response.status === 401) {
      sessionStorage.clear();
      window.location.assign("/")
    }
    throw err;
  }
}
