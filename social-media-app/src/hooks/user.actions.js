import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";

function useUserActions() {
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_API_URL;

    return {
        login,
        register,
        logout,
        edit,
    };

    // Login the user
    async function login(data) {
        const res = await axios.post(`${baseURL}/auth/login/`, data);
        // Registering the account and tokens in the store
        setUserData(res.data);
        navigate("/");
    }

    // Register the user
    async function register(data) {
        const res = await axios.post(`${baseURL}/auth/register/`, data);
        // Registering the account and tokens in the store
        setUserData(res.data);
        navigate("/");
    }

    // Logout the user
    function logout() {
        localStorage.removeItem("auth");
        navigate("/login");
    }

    async function edit(data, userId) {
        const res = await axiosService
            .patch(`${baseURL}/user/${userId}/`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        localStorage.setItem("auth",
            JSON.stringify({
                access: getAccessToken(),
                refresh: getRefreshToken(),
                user: res.data,
            })
        );
        
    }
}

    // Get the user
function getUser() {
    const auth = JSON.parse(localStorage.getItem("auth")) || null;
    if (auth) {
        return auth.user;
    } else {
        return null;
    }
}

// Get the access token
function getAccessToken() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth.access;
}

// Get the refresh token
function getRefreshToken() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth.refresh;
}

// Set the access, token and user property
export function setUserData(data) {
    localStorage.setItem("auth",
        JSON.stringify({
            access: data.access,
            refresh: data.refresh,
            user: data.user,
        }),
        
    );
}




export { useUserActions, getUser, getAccessToken, getRefreshToken };