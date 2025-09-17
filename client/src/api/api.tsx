import axios from "axios";

type RestResponse = {
  statusCode: number,
  result: boolean,
  data: any,
  message: string,
  errorMessage: string | Array<any>
}

const api = axios.create({
  baseURL: "http://localhost:8000"
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: any) => {
    console.log(`Error in when use API: ${error}`);
    return Promise.reject(error);
  }
);

export default api;