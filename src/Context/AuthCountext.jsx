import {  createContext, useEffect, useState } from "react";

export const authCountext = createContext();

export default function AuthCountext({ children }) {
    const [ token , setToken ] = useState(null);
        useEffect(()=>{
            const usertoken = localStorage.getItem('tkn');
            if( usertoken != null ){
                setToken(usertoken);
            }
        },[])
  return  <authCountext.Provider value={{ token,setToken }}>
      { children }
    </authCountext.Provider>
  
}
