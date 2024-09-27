//Import
import React, { useEffect, useState } from "react";
import { Pokemon } from "../model/pokemon";
import { fetchPokemonList } from "../service/PokemonService";
import { Link, useNavigate } from "react-router-dom";

//Configuração do primereact
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
        
        


const PokemonList: React.FC = () => {

    //criação das props
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const navigate = useNavigate();

    //criação de métodos se houver
    //função para buscar a definir a lista de Pokémons
    //Buscar
    useEffect(()=>{
        const getPokemons = async () =>{
            const result = await fetchPokemonList();
            setPokemons(result);
        };      
        getPokemons();
    }, []);

    const detailsPokemon = (rowData: Pokemon) =>{
        return(
            <Link to={`/pokemon/${rowData.name}`}>
                <Button label="Details" icon="pi pi-info"/>
            </Link>
        );
    };

    //retorno do componente
    return(
        <div>
           <h1>Pokemon List</h1>
           <div className="card">
            <DataTable value={pokemons} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" sortable></Column>
                <Column field="Details" body={detailsPokemon}></Column>
            </DataTable>
        </div>
        </div>
    );
}


//export
export default PokemonList