import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from './SearchBar/SearchBar';
import Cards from './DisplayCards/Cards';
import { Link } from 'react-router-dom';
import { fetchPokemon, fetchReset } from '../../store/actions';
import "./MainPage.css"

export default function MainPage() {
  // aqui tambien se podria aplicar un useEffect que se ejecutara cada vez que se accediera a este component, y verificara si pokemon.length > 0, de no ser asi hiciera un solo fetch de la api para llenar la lista con los pokemon
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loadingPage);
  const error = useSelector((state) => state.error);
  const pokemon = useSelector((state) => state.pokemonAPI);

  useEffect(() => {
    if (pokemon.length === 0 || !pokemon.some((p) => !isNaN(p.id))) {
      dispatch(fetchPokemon());
    }
  }, [ pokemon]);

  useEffect(() => {
    if (error) {
      dispatch(fetchReset());
      dispatch(fetchPokemon());
    }
  }, [error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Pokemon</h1>
      <div>
        <SearchBar/>
        <Link to="/create-pokemon">
            <button >create new pokemon</button>
        </Link>
      </div>
      
      <Cards/>
      
    </div>
  );
}