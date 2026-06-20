import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const registerUser = async ({ username, email, password }) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/register`,
      {
        username,
        email,
        password,
      },
      { withCredentials: true },
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err; // propagate so the caller knows login failed
  }
};

export const loginUser = async ({ email, password }) => {
    try{
        const response = await axios.post(
            `${API_URL}/api/auth/login`,
            {
                email,
                password,
            },
            { withCredentials: true },
        );
        return response.data;
    }catch(err){
        console.log(err);
        throw err; // propagate so the caller knows login failed
    }
}

export const logoutUser = async () => {
    try{
        const response = await axios.get(
            `${API_URL}/api/auth/logout`,
            { withCredentials: true },
        );
        return response.data;
    }catch(err){    
        console.log(err);
    }
}

export const getCurrentUser = async () => {
    try{
        const response = await axios.get(
            `${API_URL}/api/auth/get-me`,
            { withCredentials: true },
        );
        return response.data;
    }catch(err){
        console.log(err);
    }
}