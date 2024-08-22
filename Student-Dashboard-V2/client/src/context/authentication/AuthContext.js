import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() =>{
        // Check local storage for user data
        const savedUser = localStorage.getItem("userData");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        if (user) {
            getUserData();
        }
    }, [user]);

    async function getUserData() {
        const token = localStorage.getItem("userData");
        
        try {
            const response = await fetch(`https://student-dasboard.onrender.com/auth/account`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token.split('"')[1]}`
                },
            });

            console.log("User data:", response);

            if (response.status === 200) {
                const data = await response.json();
                setUserData(data);
            } else {
                const errorText = await response.text();
                console.error('Error while fetching user data:', errorText);
            }
        } catch (error) {
            console.error('Error while fetching user data:', error);
        }
    }
    

    // Login function to set the user in context
    const authLogin = (userData) => {
        try {
            localStorage.setItem("userData", JSON.stringify(userData));
            setUser(JSON.stringify(userData));
        } catch (error) {
            console.error("Error while logging in:", error);
        }
    };

    // Logout function to clear user data from context and storage
    const authLogout = async () => {
        try {
            setUser(null);
            const response = await axiosInstance.post("/auth/logout", {
                method: "POST",
                withCredentials: true,
            });

            if (response.status === 200) {
                localStorage.removeItem("userData");
                setUserData(null);
                setUser(null);
            } else {
                console.error("Error while logging out:", response);
            }
        } catch (error) {
            console.error("Error while logging out:", error);
        }
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
        <AuthContext.Provider value={{ user, userData, authLogin, authLogout, authUpdateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
