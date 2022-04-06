import axios, { AxiosRequestConfig } from "axios";

export default async function handleRajaOngkir({
  url,
  method,
  data,
  headers,
}: AxiosRequestConfig) {
     const response = await axios({
       url,
       method,
       data,
       headers: {
         Authorization: headers,
       },
     }).catch((err) => err.response);

     if (response?.status > 300) {
       const res = {
         error: true,
         message: response?.status?.description,
         data: null,
       };
       return res;
     }
     const res = {
       error: false,
       message: "success",
       data: response.data,
     };

     return res;
}
