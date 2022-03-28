import React from 'react';
import pokebola from './Pokebola.gif'
import NotFound from './NotFoundPikachu.gif'
import './App.css';
import axios from 'axios';
import { useState, useRef } from 'react'

function App() {

  //para guardar valor del input
  const inputPokemon = useRef(null);
  
  //Variables para la imagen, nombre y habilidades
  const [imgPokemon, setImgPokemon] = useState(pokebola);
  const [pokemonName, setPokemonName] = useState('Pokémon');
  const [abilities, setAbilities] = useState({
    hp: null,
    attack: null,
    defense: null,
    specialAttack: null,
    specialDefense: null,
    speeed: null
  });

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
        //console.log(datos.data.stats[0].stat.name);
        //Variables para habilidades del pokémon
        const skills = [
          datos.data.stats[0].base_stat, 
          datos.data.stats[1].base_stat,
          datos.data.stats[2].base_stat,
          datos.data.stats[3].base_stat,
          datos.data.stats[4].base_stat,
          datos.data.stats[5].base_stat
        ];
        setAbilities({
          hp: skills[0], 
          attack: skills[1],
          defense: skills[2],
          specialAttack: skills[3],
          specialDefense: skills[4],
          speeed: skills[5]
        })
      } catch (error) {
        //console.log('falla');
        setPokemonName("¡No Encontrado!");
        setImgPokemon(NotFound);
      }
      console.log(abilities);
      //console.log(datos.data.forms[0].name);
    }
    getDatos();
  }

  return (
    <React.Fragment>
      
      <div className='container'>

        <section className='pokedex'>

          <header className='header-part'>
            <div className='circle 1'></div>
            <div className='circle 2'></div>
            <div className='circle 3'></div>
            <div className='circle 4'></div>
          </header>

          <main className='info-part'>
            <div className='screen-container'>
              <div className='screen'>
                <div className='name-pokemon'>
                  <h1>{pokemonName}</h1>
                </div>

                <div className='img-pokemon'>
                  <img 
                  className='img-pkm'
                  src={imgPokemon} 
                  alt='Pokebola'
                  />
                </div>

                <div className='abilities'>
                  <div className='box-info'>
                    <p> <b>Hp:</b> {abilities.hp}</p>
                    <p> <b>Attack:</b> {abilities.attack}</p>
                    <p> <b>Defense:</b> {abilities.defense}</p>
                    <p> <b>Special-Attack:</b> {abilities.specialAttack}</p>
                    <p> <b>Special-Defense:</b> {abilities.specialDefense}</p>
                    <p> <b>Speeed:</b> {abilities.speeed}</p>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer className='footer-part'>
            <div className='buttons'>
              <div className='decoration'></div>
              <div className='decoration'></div>
              <div className='decoration'></div>
            </div>
            <div className='search-container'>
              <input className='search-input' placeholder=' Pikachu....' ref={inputPokemon}/>
              <button className='submit-btn' onClick={HandleButton}></button>
            </div>
          </footer>

        </section>

        <section className='pokedex-back'>
          <div className='square-top'></div>
          <div className='square'>
            <h2>Pokédex</h2>
          </div>
        </section>

      </div>

    </React.Fragment>

  );
}

export default App;
