import axios from "axios";

const token = localStorage.getItem("access_token");

const clientAxiosPrivate = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
});

export default clientAxiosPrivate;
