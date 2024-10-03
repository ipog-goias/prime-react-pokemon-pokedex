//Import
import React, { useEffect, useState } from "react";
import { Pokemon } from "../model/pokemon";
import { fetchPokemonList } from "../service/PokemonService";
import { Link, useNavigate } from "react-router-dom";

//Configuração do primereact
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Paginator } from "primereact/paginator";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
        


const PokemonList: React.FC = () => {

    //criação das props = campos(inforamções que você irá receber do usuário)
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
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

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    //Manipulação de forma explícita do dado contido na datatable
    //Função de mudança de página
    const onPageChange = (e: any) => {
        console.log(e); //componente da tabela
        setFirst(e.first);
        setRows(e.rows);
    }

    //Função para pesquisar na tabela
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setGlobalFilter(e.target.value);
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilter}
                     onChange={onGlobalFilterChange} 
                     placeholder="Digite o pokémon" />
                </IconField>
            </div>
        );
    };

    const header = renderHeader();

    //retorno do componente
    return(
        <div>
           <h1>Pokemon List</h1>
           <div className="card">




            <DataTable value={pokemons}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]} 
                        tableStyle={{ minWidth: '50rem' }}
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                        paginatorLeft={paginatorLeft}
                        paginatorRight={paginatorRight}
                        
                        globalFilter={globalFilter}
                        globalFilterFields={['name']}
                        header={header}
                        emptyMessage="Pokémon não encontrado."
                >
                <Column field="name" header="Name" sortable filter></Column>
                <Column field="Details" body={detailsPokemon}></Column>
            </DataTable>
        </div>
        </div>
    );
}


//export
export default PokemonList