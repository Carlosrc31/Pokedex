import React from 'react';
import pokebola from './Pokebola.png'
import './App.css';
import axios from 'axios';
import { useState, useRef } from 'react'

function App() {

  //para guardar valor del input
  const inputPokemon = useRef(null);
  
  //Variables para la imagen y nombre
  const [imgPokemon, setImgPokemon] = useState(pokebola);
  const [pokemonName, setPokemonName] = useState('Pokémon');


  const HandleButton = () => {
  
    //Obtenemos lo ingresado en el input y lo pasamos a minúsculas
    const pokemonSearched = inputPokemon.current.value.toLowerCase();

    //Consultamos la API y con el nombre usado en la input
    const API = `https://pokeapi.co/api/v2/pokemon/${pokemonSearched}`;
    
    //console.log('Prueba')

    //Función asíncrona para obtener la img y nombre
    const getDatos = async () => {

      //Manejo de errores
      try {
        const datos = await axios.get(API)
        //console.log(datos.status);
        //Obtiene la imagen
        setImgPokemon(datos.data.sprites.front_default);
        //Obtiene el nombre del pokémon
        setPokemonName(datos.data.forms[0].name)
        //console.log(datos)
      } catch (error) {
        //console.log('falla');
        setPokemonName("Pokémon no encontrado :(");
      }
      //console.log(datos.data.forms[0].name);
    }
    getDatos();
  }

  return (
    <React.Fragment>
      <h1>Pokedex</h1>
      <input placeholder='Ejemplo Pikachu' ref={inputPokemon}/> <br/>
      <h2>{pokemonName}</h2> <br/>
      <img 
      src={imgPokemon} 
      alt='Pokebola'
      style={{width: '100px'}}/> <br/>
      <button onClick={HandleButton}>Buscar Pokémon</button>
    </React.Fragment>

  );
}

export default App;
