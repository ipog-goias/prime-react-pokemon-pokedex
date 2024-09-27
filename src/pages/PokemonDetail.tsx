//import as componentes de classe
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PokemonDetail } from "../model/pokemon-detail";
import { fetchPokemonDetail, fetchPokemonDetailByName } from "../service/PokemonService";

//componentes - primereact
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Panel } from 'primereact/panel';


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
                const result = await fetchPokemonDetailByName(name);
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

    /*div principal*/
    <div className="p-grid p-justify-center">
        <div className="p-col-12 p-md-6">
            <Card
                title={pokemon.name}
                subTitle={`Base Experience: ${pokemon.base_experience}`}
                style={{ width: '50%' }}
                header={<img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />}>
                <p className="m-0">
                   <h3>Details</h3>
                   <p><b>Heigth:</b> {pokemon.height}</p>
                   <p><b>Weight:</b> {pokemon.weight}</p>
                </p>
                <Panel header="Types" toggleable>
                    {pokemon.types.map((typeInfo) =>(
                        <Tag key={typeInfo.type.name} severity="info" value={typeInfo.type.name}/>    
                        ))}
                </Panel>

                <Panel header="Abilities" toggleable>
                     {pokemon.abilities.map((abilityInfo) =>(
                        <Tag key={abilityInfo.ability.name} severity="success" value={abilityInfo.ability.name}/>    
                        ))}
                </Panel>

                <Panel header="Stats" toggleable>
                     {pokemon.stats.map((statsInfo) =>(
                        <Tag key={statsInfo.stat.name} severity="warning" value={statsInfo.base_stat}/>    
                        ))}
                </Panel>
            </Card>
        </div>
    </div>

/*     <div>
        <h1>{pokemon.name} Details</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p><b>Heigth:</b> {pokemon.height}</p>
        <p><b>Weight:</b> {pokemon.weight}</p>
        <p><b>Base Experience:</b> {pokemon.base_experience}</p>

        <h3>Types</h3>
        <ul>
            {pokemon.types.map((typeInfo) =>(
                <li key={typeInfo.type.name}>{typeInfo.type.name}</li>    
            ))}
        </ul>

        <h3>Abilities</h3>
        <ul>
            {pokemon.abilities.map((abilityInfo) =>(
                <li key={abilityInfo.ability.name}>
                    {abilityInfo.ability.name} - 
                    {abilityInfo.is_hidden && '(Hidden)'}
                </li>    
            ))}
        </ul>

        <h3>Stats</h3>
        <ul>
            {pokemon.stats.map((statsInfo) =>(
                <li key={statsInfo.stat.name}>
                    <b>{statsInfo.stat.name}</b> - {statsInfo.base_stat}
                </li>    
            ))}
        </ul>
    </div> */
)

}

//export componnente
export default PokemonDetails
