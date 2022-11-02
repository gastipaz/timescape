import { createContext, useState } from "react";


function useAuth() {

    function getAuthState() {
        const auth = localStorage.getItem('auth');
        const parsedAuth = auth ? JSON.parse(auth) : auth;
        return parsedAuth && parsedAuth
    }

    const [authenticated, setAuthenticated] = useState(getAuthState());

    function saveAuthState(userAuth) {
        localStorage.setItem('auth', JSON.stringify(userAuth));
        setAuthenticated(userAuth);
    };

    function removeAuthState(userAuth) {
        localStorage.removeItem('auth');
        setAuthenticated(userAuth);
    }

    return {
        setAuthenticated: saveAuthState,
        authenticated,
        removeAuthState
    }
}


const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [showAccessWindow, setShowAccessWindow] = useState(false)
    const {authenticated, setAuthenticated, removeAuthState} = useAuth()



    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated, removeAuthState, showAccessWindow, setShowAccessWindow }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;