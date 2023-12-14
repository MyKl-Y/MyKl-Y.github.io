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

    // Update user function to modify user data in context and storage
    const authUpdateUser = (newUsername) => {
        setUser(prevUser => ({
            ...prevUser,
            name: newUsername,
        }));
        const updatedUserData = { ...user, name: newUsername };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
    };

    return (
        <AuthContext.Provider value={{ user, authLogin, authLogout, authUpdateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
