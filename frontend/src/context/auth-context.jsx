import {createContext, useState, useContext} from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState(false);

    return <AuthContext.Provider value={{
        isLogin,
        setIsLogin,
    }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const {isLogin, setIsLogin} = useContext(AuthContext)

    return {isLogin, setIsLogin}
}