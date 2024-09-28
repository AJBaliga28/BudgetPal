import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const BASE_URL =
  `${process.env.REACT_APP_API_URL}/api/users` ||
  "http://localhost:5000/api/users";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Axios Interceptor to add token to all requests
  useEffect(() => {
    const axiosInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Eject the interceptor when the component unmounts
    return () => {
      axios.interceptors.request.eject(axiosInterceptor);
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      const { token, username } = response.data;
      console.log("Token and Username: ", token, username);

      setToken(token); // Set token in state
      setUser({ username }); // Set user in state
      localStorage.setItem("token", token); // Store token in localStorage
      localStorage.setItem("user", JSON.stringify({ username })); // Store user in localStorage
      setLoading(false);
      alert("Successfully logged in!");
      return true; // Return true for successful login
    } catch (err) {
      handleError(err); // Handle error
      return false; // Return false if login fails
    }
  };

  const signup = async (username, email, password) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        username,
        email,
        password,
      });
      alert("Account successfully created!");
      setLoading(false);
      return true;
    } catch (err) {
      handleError(err); // Handle errors during signup
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token"); // Clear token from localStorage
    localStorage.removeItem("user"); // Clear user from localStorage
  };

  const verifyToken = async () => {
    if (!token) {
      console.log("No token found, skipping token verification.");
      return; // Skip if no token is available
    }

    try {
      console.log("Verifying token...");
      const response = await axios.get(`${BASE_URL}/verify-token`, {
        headers: { Authorization: `Bearer ${token}` }, // Pass token in header
      });

      const { username } = response.data;
      console.log("Token valid, user: ", username);
      setUser({ username }); // Set user state if token is valid
    } catch (err) {
      console.log("Token verification failed. Logging out.");
      logout(); // Log out if token verification fails
    }
  };

  // Verify token on component mount and when the token changes
  useEffect(() => {
    if (token) {
      verifyToken(); // Verify the token when the app starts or when token changes
    }
  }, [token]);

  const handleError = (err) => {
    const errorMessage = err.response?.data?.message || "An error occurred";
    setError(errorMessage); // Set error message
    setLoading(false); // Stop loading
  };

  // Log user state when it changes (for debugging purposes)
  useEffect(() => {
    console.log("User state updated: ", user);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, token, loading, error, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const useLoading = () => {
  const { loading } = useAuth();
  return loading;
};
