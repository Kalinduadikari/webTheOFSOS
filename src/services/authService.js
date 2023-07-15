import axios from "axios";
import { toast } from "react-toastify";
import axiosRetry from 'axios-retry';

export const BACKEND_URL = process.env.REACT_APP_OFSOS_BACKEND_URL;

export const validateEmail = (email) => {
 return email.match(
    /^(?=.{1,256}(?=@.{1,256}$))((?:(?!@)[\w&'*+._%-]+(?:(?<!\\)[,;])?)+)@((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.?)+(?:[A-Za-z]{2,}(?<!-))$/i
 );
};

//REGISTER USER
export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/fishmongers/signup`, userData, { withCredentials: true });
      if (response.statusText === "OK") {
        toast.success("Registered successfully");
      }
      return response.data;
    } catch (error) {
      let message;
      if (error.response) {
        if (error.response.status === 409) { // Added this block
          message = "Email is already taken";
        } else {
          message = (
            error.response.data && error.response.data.error) || error.message || error.toString();
        }
      } else {
        message = error.message || "An error occurred. Please try again.";
      }
      toast.error(message);
      throw new Error(message);
    }
  };
  
  


// Configure axios instance and add retry mechanism
const axiosInstance = axios.create();
axiosRetry(axiosInstance, {
  retries: 3, 
  retryDelay: (retryCount) => {
    return retryCount * 1000; 
  },
});


//LOGIN USER
export const loginUser = async (userData) => {
    try {
      const response = await axiosInstance.post(
        `${BACKEND_URL}/fishmongers/signin`,
        userData,
        { withCredentials: true }
      );
  
      if (response.statusText === "OK") {
        toast.success("Logged in successfully");
      }
  
      return response.data;
    } catch (error) {
      let message;
      if (error.response) {
        switch (error.response.status) {
          case 400:
            message = "Invalid credentials. Please try again.";
            break;
          case 401:
            message = "Unauthorized. Please check your email and password.";
            break;
          case 500:
            message = "Internal server error. Please try again later.";
            break;
          default:
            message = "An unexpected error occurred. Please try again.";
        }
      } else {
        message = error.message || "An error occurred. Please try again.";
      }
      toast.error(message);
    }
  };

  // LOGOUT USER
export const logoutUser = async ({ onSuccess, onError }) => {
    try {
      // Replace the URL with your API endpoint for logging out users
      const response = await axios.post(`${BACKEND_URL}/fishmongers/signout`, {}, { withCredentials: true });
  
      if (response.status === 200) {
        localStorage.removeItem("name");
        if (onSuccess) {
          onSuccess(response);
        }
      } else {
        if (onError) {
          onError(new Error("Logout failed"));
        }
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };

  // FORGOT PASSWORD
export const forgotPassword = async (email) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/fishmongers/forgotpassword`, { email });
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Error while sending password reset email");
      }
    } catch (error) {
      console.error("Error while sending password reset email", error);
      toast.error("An error occurred while sending the password reset email. Please try again.");
    }
  };
  


// RESET PASSWORD
export const resetPassword = async (token, password) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/fishmongers/resetpassword`,
        { token, newPassword: password }, // Change this line
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Error while resetting password");
      }
    } catch (error) {
      console.error("Error while resetting password", error);
      toast.error("An error occurred while resetting your password. Please try again.");
    }
  };
  


  // Check authentication
  export const checkAuthentication = async () => {
    try {
      const response = await axiosInstance.get(
        `${BACKEND_URL}/fishmongers/loggedin`,
        { withCredentials: true }
      );
  
      return response.status === 200;
    } catch (error) {
      console.error("Error while checking authentication", error);
      toast.error("An error occurred while checking authentication. Please try again.");
      return false;
    }
  };
  