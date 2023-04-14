import {createContext, useContext, useState} from 'react';

// Cria o contexto de autenticação
const AuthContext = createContext();


export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const authenticate = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    // Define os valores do contexto
    const authContextValues = {
        isAuthenticated,
        authenticate,
        logout,
    };

    return <AuthContext.Provider value={authContextValues}>{children}</AuthContext.Provider>;
}
export function useAuth() {
    return useContext(AuthContext);
}
