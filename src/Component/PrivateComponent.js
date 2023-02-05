import { Outlet, Navigate } from "react-router-dom";

const PrivateComponent = () =>{

    return(
            localStorage.getItem('user')?<Outlet />:<Navigate to='/signup' />       
    )
}

export default PrivateComponent