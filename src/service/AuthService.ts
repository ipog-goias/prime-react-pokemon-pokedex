//Importação do react
import React from 'react'
import { User } from '../model/user';


//Declaração do tipo
const fakeUser: User = {
    id:1,
    username: 'admin',
    token: '123456abcef'
};

//método de autenticação
export const login = async(username: string, password: string): Promise<User> => {
    //Simulação de autenticação

    if(username === 'admin' && password === 'password'){
        return fakeUser;
    }
    else{
        throw new Error('Usuário ou senha inválidos.')
    }
}

//método de logff
export const logout = (): void => {
    //Limpar a seção de usuário
    localStorage.removeItem('user');
}