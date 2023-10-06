import axios from "axios";

const Request = axios.create({baseURL: process.env.REACT_APP_API_BASE_URL});

/* LOGIN */
export async function login(request: any): Promise<any> {
    throw new Error("Not implemented");
}