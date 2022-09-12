import { createContext,useCallback,useMemo,useState,useContext } from "react";
import PropTypes from "prop-types"


const MY_AUTH_APP='MY_AUTH_APP'

export const Authcontext=createContext();

export function AuthContextProvider({children}){
    const[isAuthenticated,setIsAuthenticated]=useState(window.localStorage.getItem(MY_AUTH_APP)??false)


    const login=useCallback(function(){
        window.localStorage.setItem(MY_AUTH_APP,true)
        setIsAuthenticated(true)
    },[])

    const logout=useCallback(function(){
        window.localStorage.removeItem(MY_AUTH_APP)
        window.localStorage.removeItem('persist:main-root')
        setIsAuthenticated(false)
    },[])

    const value=useMemo(
    ()=>({
        login,
        logout,
        isAuthenticated
    }),
    [login,logout,isAuthenticated])

    return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>

}

AuthContextProvider.propTypes = {
    children: PropTypes.object
}

export function useAuthContex(){
    return useContext(Authcontext)
}