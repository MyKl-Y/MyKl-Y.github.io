import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check if the user is authenticated when the app loads
    useEffect(() => {
        const token = localStorage.getItem("token"); // You may use cookies or other storage methods
        if (token) {
        // Verify the token on the server and fetch user data
        // Example fetch call:
        fetch("/api/auth/verifyToken", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Invalid token");
            }
            })
            .then((userData) => {
            setUser(userData);
            })
            .catch((error) => {
            console.error("Authentication error: " + error.message);
            setUser(null);
            });
        } else {
        setUser(null);
        }
    }, []);

    // Login function to set the user in context
    const login = (userData) => {
        setUser(userData);
        // Save the token in storage (e.g., localStorage)
        localStorage.setItem("token", userData.token);
    };

    // Logout function to clear user data from context and storage
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
