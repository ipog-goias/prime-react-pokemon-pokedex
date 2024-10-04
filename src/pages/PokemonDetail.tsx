//import as componentes de classe
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PokemonDetail } from "../model/pokemon-detail";
import { fetchPokemonDetail, fetchPokemonDetailByName } from "../service/PokemonService";

//componentes - primereact
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Panel } from 'primereact/panel';
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";


//componente
const PokemonDetails: React.FC = () =>{
//declaração dos atributos
const {name} = useParams<{name: string}>();
const [pokemon, setPokemon] = useState<PokemonDetail | null>(null)
const navigate = useNavigate();

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

const voltar = ()=>{
    navigate(-1);
}

const headerTemplate = (
    <div style={{textAlign: 'center'}}>
        <img src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-image"
        />
    </div>
);

//retornar o componente
return (

    /*div principal*/
    <div className="p-grid p-justify-center">
        <div className="p-col-12 p-md-8">
            <Card
                title={pokemon.name.charAt(0).toLocaleUpperCase() + pokemon.name.slice(1)}
                subTitle={`Base Experience: ${pokemon.base_experience}`}
                style={{ width: '100%', padding: '2rem' }}
                header={headerTemplate}
                className="shadow-4"
                >
                <div className="p-grid">
                   <div className="p-col-6">
                        <p><b>Heigth:</b> {pokemon.height / 10} m</p>
                   </div>
                   <div className="p-col-6">
                        <p><b>Weight:</b> {pokemon.weight / 10} kg</p>
                   </div>
                </div>

            <Divider />

                <Panel header="Types" toggleable className="p-mb-3">
                    {pokemon.types.map((typeInfo) =>(
                        <Tag key={typeInfo.type.name} severity="info" value={typeInfo.type.name}/>    
                        ))}
                </Panel>

                <Panel header="Abilities" toggleable className="p-mb-3" collapseIcon="pi pi-minus" expandIcon="pi pi-plus" >
                     {pokemon.abilities.map((abilityInfo) =>(
                        <Tag key={abilityInfo.ability.name} severity="success" value={abilityInfo.ability.name}/>    
                        ))}
                </Panel>

                <Panel header="Stats" toggleable>
                     {pokemon.stats.map((statsInfo) =>(
                        <Tag key={statsInfo.stat.name} severity="warning" value={statsInfo.base_stat}/>    
                        ))}
                </Panel>

                <div className="p-mb-4" style={{textAlign: 'center'}}>
                    <Button label="Voltar" icon="pi pi-arrow-left" className="p-button-secondary" onClick={voltar} />
                </div>

            </Card>
        </div>
    </div>
)

}

//export componnente
export default PokemonDetails
