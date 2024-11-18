import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getAccessToken, getRefreshToken } from '../hooks/user.actions';

const axiosService = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// write a request interceptor to add headers to the request:
axiosService.interceptors.request.use(async (config) => {
    /**
     * Retrieving the access token from the localStorage and adding it to the headers of the request
     */
    const accessToken = getAccessToken();  // Get the access token
    config.headers.Authorization = `Bearer ${accessToken}`;  // Set the Authorization header
    
    // Log the Authorization header to ensure it's being set correctly
    console.log("Authorization Header:", config.headers.Authorization);
    return config;
});

// resolve the requests and return a resolved or rejected promise:
axiosService.interceptors.response.use(
    (res) => Promise.resolve(res),
    (err) => Promise.reject(err)
);

// function will be called whenever the failed request returns a 401 error
const refreshAuthLogic = async (failedRequest) => {
    const refreshToken = getRefreshToken();  // Get the refresh token
    return axios.post("/refresh/token/", null, {
        baseURL: "http://localhost:8000",
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    }).then((resp) => {
        const {access, refresh, user} = resp.data;
        failedRequest.response.config.headers["Authorization"] = "Bearer " + access;
        localStorage.setItem("auth", JSON.stringify({
            access, refresh, user
        }));
    }).catch(() => {
        localStorage.removeItem("auth");
    });
};

// initialize the authentication interceptor and create a custom fetcher too
createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export async function fetcher(url) {
    const res = await axiosService.get(url);
    return res.data;
}

export default axiosService;