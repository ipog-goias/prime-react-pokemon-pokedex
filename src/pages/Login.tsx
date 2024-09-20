//Import
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../service/AuthService";
import Input from "../components/Shared/Input";
import Button from "../components/Shared/Button";

//declaração
const Login: React.FC = () => {

    //Declaração das props
    const [username, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    //fazer o método de login
    const handleLogin = async () => {
        //Fazer tratamento de exceção
        try{

            const user = await login(username, password)
            localStorage.setItem('user', JSON.stringify(user));
            history('/dashboard');

        }catch(e){
            //tratamento de erro
            console.log(`Erro ao fazer login: {}`, e);
            setError(`Usuário ou password inválido.`);
        }
    }


    //retorno o componente
    return(
        <div>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <Input type="text"  value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Informa seu usuário:" />
            <Input type="password" value={password} onChange={(e) => setPassWord(e.target.value)} placeholder="Informa sua senha:" />
            <Button label="Login" onClick={handleLogin} />
        </div>
    );
}


//export
export default Login