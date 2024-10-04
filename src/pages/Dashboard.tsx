//Import
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../service/AuthService";

import axiso from 'axios';
import axios from "axios";
import { fetchPokemonList, fetchTotalPokemon, fetchType } from "../service/PokemonService";
import { Pokemon } from "../model/pokemon";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";

//declaração
const Dashsboard: React.FC = () => {

    //define os atributos/pros
    const [pokemons, setPokemons] = useState<any[]>([]); //pokemon
    const [totalPokemons, setTotalPokemons] = useState<number>(0); //total de pokemon e pesquisa
    const [types, setTypes] = useState<any>([]); //tipos de pokemons
    const [typeChardData, setTypeChartData] = useState<any>(null); //imprimir o chart.js


    //TODO converter chamada para axios
    useEffect(()=>{

        //pesquisar a lista de pokemons
        const listaPokemons = async () =>{
            try {
                const pokemons = await fetchPokemonList(0,100);
                setPokemons(pokemons)

                const response = await fetchTotalPokemon();
                setTotalPokemons(response.count)
            } catch (error) {
                console.error(`Erro ao fazer fetch na API: `, error);
            }
        };

        //pesquisar a lista de pokemons
        const listaTypes = async () =>{
            try {
                const response = await fetchType();
                const typeData = response.results;
                setTypes(typeData)

                //Montar o gráfico no chart.js
                const labels = typeData.map((type: any) => type.name);
                const data = typeData.map(()=> Math.floor(Math.random() * 100));
                setTypeChartData({
                    labels: labels,
                    datasets:[
                        {
                            label: 'Pokémon por Type',
                            backgroundColor: '#7ca2c3',
                            data: data
                        }
                    ]
                });                
            } catch (error) {
                console.error(`Erro ao fazer fetch na API: `, error);
            }
        };
        listaPokemons();
        listaTypes();
    //O array vazio [] 
    //faz com que o useEffect seja
    //executado apenas uma vez na montagem do componente

    }, [] );

    //Detalhes do pokemons para um datatable
    const pokemonTemplate = (row: any)=>{
        
    }


    const handleLogout = () => {
        logout();
    }



    //retorno do componente
    return(
        <div>
            <div><h1>Pokémon Dashboard</h1></div>
            <div>
                {/*Total de pokemons*/}
                <div>
                    <Card title="Total de Pokémons" style={{textAlign: 'center'}}>
                        <h2>{totalPokemons}</h2>
                    </Card>
                </div>
            </div>

            {/* Tipos de Pókemon*/}
            <div>
                <Card title="Tipos de Pokémons" style={{textAlign: 'center'}}>
                    { typeChardData && (
                        <Chart type="bar" data={typeChardData}
                        options={{responsive: true}} />
                    )}
                </Card>
            </div>


        </div>



       /* <div>
            <h1>Dashboard</h1>
            <p>Seja bem-vindo ao Dashboard IPOG!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>*/
    );
}


//export
export default Dashsboard