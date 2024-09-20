//Import
import React, { useEffect, useState } from "react";
import { Pokemon } from "../model/pokemon";
import { fetchPokemonList } from "../service/PokemonService";

//declaração dos tipos

interface PokemonListProps {
    onSelect: (url: string) => void
}


const Pokemon: React.FC<PokemonListProps> = ({onSelect}) => {

    //criação das props
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    //criação de métodos se houver
    useEffect(()=>{
        const getPokemons = async () =>{
            const result = await fetchPokemonList();
            setPokemons(result);
        };      
        getPokemons();
    }, []);

    //retorno do componente
    return(
        <div>
           <h1>Pokemon list</h1>
        </div>
    );
}


//export
export default Pokemon