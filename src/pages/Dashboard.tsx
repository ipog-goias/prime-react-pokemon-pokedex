//Import
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../service/AuthService";

//declaração
const Dashsboard: React.FC = () => {

    const history = useNavigate();

    const handleLogout = () => {
        logout();
    }


    return(
        <div>
            <h1>Dashboard</h1>
            <p>Seja bem-vindo ao Dashboard IPOG!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}


//export
export default Dashsboard