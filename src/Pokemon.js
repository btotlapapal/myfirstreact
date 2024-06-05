import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, CircularProgress, Container, CardActionArea,Button } from "@mui/material";

const Pokemon = () => {
    const [pokemones, setPokemones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);

    useEffect(() => {
        const traerPokemones = async () => {
            const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
            if (!respuesta.ok) {
                console.log("ocurrio un error");
            } else {
                const data = await respuesta.json();
                setPokemones(data.results);
                console.log(data.results);
            }
        }
        traerPokemones();
    }, []);

    const fetchDetallePokemon = async (id) => {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        if (!respuesta.ok) {
            console.log("ocurrio un error");
        } else {
            const data = await respuesta.json();
            setPokemonSeleccionado(data);
            console.log(data);
        }
    }

   
    

 
return(
    <div>
        <h1>Lista de Pokemones</h1>
        <ul>
            {pokemones.map((pokemon,index)=>(
                <li key={index}>
                {pokemon.name}<Button variant="outlined" onClick={()=>fetchDetallePokemon(index+1)}>Seleccionar pokemon</Button>
                </li>
            ))}
        </ul>
        <hr/>
        <h1>Detalle de pokemon</h1>
        {/* ESTE ELEMENTO APARECE SOLAMENTE CUANDO pokemonSeleccionado ES DIFERENTE A NULL */}
        <Container>

        {pokemonSeleccionado &&
          (
            <div>
                <Card>
                <CardContent></CardContent>
                </Card>
                <p> Nombre: {pokemonSeleccionado.name}</p>
                <img src={pokemonSeleccionado.sprites.front_default}/>
                <p>Altura: {pokemonSeleccionado.height} </p>
                <p>Peso: {pokemonSeleccionado.weight} </p>

                </div>

        )}

        </Container>
        
       

        
    </div>
)
};


export default Pokemon;