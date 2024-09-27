//Importação dos pacotes
import { PokemonDetail } from '../model/pokemon-detail';
import { PokemonListResponse, Pokemon } from './../model/pokemon';

//Declaração de atributos
const API_URL = 'https://pokeapi.co/api/v2/'

//Métodos relacionados a a consulta
export const fetchPokemonList = async (offset = 0, limit=20): Promise<Pokemon[]> => {
    //faça a consulta no serviço
    const response = await fetch(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`)

    //verifico se tem retorno na resposta
    //Aqui estamo definindo o tipo de resposta baseado em um contrato
    const data: PokemonListResponse = await response.json();
    //Agora o typescript conhece que data tem uma propriedade results.
    return data.results;

    
};

export const fetchPokemonDetail = async (id: string): Promise<PokemonDetail> => {
    const response = await fetch(`${API_URL}/pokemon/${id}`)
     //Aqui estamo definindo o tipo de resposta baseado em um contrato
     const data: PokemonDetail = await response.json();
     //Agora o typescript conhece que data tem uma propriedade results.
     return data;
}

export const fetchPokemonDetailByName = async (name: string): Promise<PokemonDetail> => {
    const response = await fetch(`${API_URL}/pokemon/${name}`)
     //Aqui estamo definindo o tipo de resposta baseado em um contrato
     const data: PokemonDetail = await response.json();
     //Agora o typescript conhece que data tem uma propriedade results.
     return data;
}
