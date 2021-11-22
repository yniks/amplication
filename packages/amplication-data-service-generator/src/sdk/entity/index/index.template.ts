import { AxiosInstance } from "axios";

declare interface CREATE_INPUT {}
declare const ENTITY_ENDPOINT: string;
declare interface ENTITY {}

export class ENTITY_NAME_SDK_SUFFIX {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly endpoint: string = ENTITY_ENDPOINT
  ) {}
  async create(body: CREATE_INPUT): Promise<ENTITY> {
    const response = await this.axios.post<ENTITY>(this.endpoint, body);
    return response.data;
  }
}
