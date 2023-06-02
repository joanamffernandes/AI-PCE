import {createContext, useContext, useState} from 'react';

// Cria o contexto de autenticação
const AuthContext = createContext();


export function AuthProvider({children}) {

    function isValidAuth() {
        //return !!localStorage.getItem('token');
        let tokenString = localStorage.getItem('token');
        if (tokenString) {
            const token = JSON.parse(tokenString);
            // verificar se já passou mais de 30 minutos deste o último login
            // caso tenha passado mais do que 30m considera o login inválido
            return token && token.value && ((new Date() - new Date(token.login_date)) <= 30 * 60 * 1000);
        }
        return false;
    }

    const [isAuthenticated, setIsAuthenticated] = useState(isValidAuth());

    const authenticate = (token) => {
        localStorage.setItem('token', JSON.stringify({value: token, login_date: new Date()}));
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
