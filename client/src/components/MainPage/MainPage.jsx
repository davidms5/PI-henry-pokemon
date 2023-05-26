import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon } from '../../store/actions';
import SearchBar from './SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import "./MainPage.css"
export default function MainPage() {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonAPI);
  const loading = useSelector((state) => state.loadingPage);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchPokemon());
  }, [dispatch]);

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
      
      {
        pokemon.map((p, index) => (
          <div key={index}>{p.nombre}</div>
        ))}
    </div>
  );
}
