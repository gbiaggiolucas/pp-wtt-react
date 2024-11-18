import React, { createContext, useState, useContext } from 'react';

// Criação do contexto
export const UserContext = createContext();

// Provider que envolve os componentes
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loginUser = (userData) => {
        setUser(userData);
    };

    const logoutUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para acessar o contexto
export const useUser = () => useContext(UserContext);
