import { serviceConfig } from "@/lib/settings";
import axios, { AxiosHeaders, RawAxiosRequestHeaders } from "axios";

export const email_service = (headers?: (RawAxiosRequestHeaders) | AxiosHeaders) => axios.create({
    baseURL: `${serviceConfig.email_service_url}:${serviceConfig.email_service_port}`,
    timeout: 60000,
    headers: headers
})
