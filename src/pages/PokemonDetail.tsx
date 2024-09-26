//import as componentes de classe
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PokemonDetail } from "../model/pokemon-detail";
import { fetchPokemonDetail } from "../service/PokemonService";


//componente
const PokemonDetails: React.FC = () =>{
//declaração dos atributos
const {name} = useParams<{name: string}>();
const [pokemon, setPokemon] = useState<PokemonDetail | null>(null)

//declaração de métodos se houver
useEffect(()=>{
    const getPokemonsDetails = async () =>{
        try {
            if(name){ //verificar se name está definido.
                const result = await fetchPokemonDetail(name);
                setPokemon(result)
            }
            
        } catch (error) {
            console.error(`Erro ao consumir de api e exibir detalhes do pokemon.`, error);
        }
    };
    getPokemonsDetails();
    //dentro de um useEffect com dependência de [name] significa que a função getPokemonsDetails
    // será executada que o valor da variavel name mudar;
},[name]);


if(!pokemon){
    return <div>Carregando...</div>
}

//retornar o componente
return (
    <div>
        <h1>{pokemon.name} Details</h1>
        {/*Inserir propriedade do detalhe.*/}
    </div>
)

}

//export componnente
export default PokemonDetails
