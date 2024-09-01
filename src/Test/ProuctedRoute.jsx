
import { Navigate } from "react-router-dom"


export default function ProuctedRoute({children}) {
    if (localStorage.getItem('tkn') == null){
       
        return <Navigate to='/login'/>
    }
    return <>
        {children}
    </>
    
}
