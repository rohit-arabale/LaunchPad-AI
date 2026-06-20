import { createContext,useState,useEffect, use } from "react";
import { getCurrentUser } from "./auth.api.js";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        const getAndSetUser = async()=>{
            try {
                const data = await getCurrentUser();
                if (data && data.user) {
                    setUser(data.user);
                }
            } catch (err) {
                console.log("Auth check failed:", err);
            } finally {
                setLoading(false);
            }
        }
        getAndSetUser();
    },[])
    
    return(
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}