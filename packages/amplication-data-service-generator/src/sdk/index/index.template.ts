import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class SERVER_NAME {
  protected axiosInstance: AxiosInstance;
  constructor(
    serverBaseUrl: string,
    axiosConfig: Omit<AxiosRequestConfig, "baseURL"> | null = null
  ) {
    this.axiosInstance = axios.create({
      baseURL: serverBaseUrl,
      ...axiosConfig,
    });
  }
}
