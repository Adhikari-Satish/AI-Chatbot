import api from "./api";
import axios from "axios";


// Register
export const register = async (userData)=>{

    return api.post(
        "/auth/register",
        userData
    );

};

export const login = async (email, password) => {

    const formData = new URLSearchParams();

    formData.append("username", email);
    formData.append("password", password);

    return api.post(
        "/auth/login",
        formData,
        {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded",
            },
        }
    );
};
