import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem("userData");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    // Login function to set the user in context
    const authLogin = (userData) => {
        setUser(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
    };

    // Logout function to clear user data from context and storage
    const authLogout = () => {
        setUser(null);
        localStorage.removeItem("userData");
    };

    return (
        <AuthContext.Provider value={{ user, authLogin, authLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
