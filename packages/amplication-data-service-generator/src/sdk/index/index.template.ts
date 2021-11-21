import axios, { AxiosInstance } from "axios";

export class SERVER_NAME {
  axiosInstance: AxiosInstance;
  constructor(public readonly serverBaseUrl: string) {
    this.axiosInstance = axios.create({ baseURL: serverBaseUrl });
  }
}
