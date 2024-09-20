//Importar React
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loadingGif from '../assets/splash.gif'

//Definição do componente
const Splash: React.FC = () => {
    //props
    const history = useNavigate();

    //metódos
    useEffect(()=>{
        const timer = setTimeout(()=>{
            const user = localStorage.getItem('user');
            if(user) {
                history('/dashboard');
            }else{
                history('/login')
            }
        },
        2000); //Tempo de processamento do splash screen

        return () => clearTimeout(timer);
    },  [history]
);

    //return do conteúdo do componente
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '150px' }}>
            <h1>Loading....</h1>
            <img src={loadingGif} alt="Loading..." style={{ width: '150px', height: '150px' }} />
        </div>
    );
}

//Exportar componente

export default Splash