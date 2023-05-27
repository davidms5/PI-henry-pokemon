import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar/SearchBar';
import Cards from './DisplayCards/Cards';
import { Link } from 'react-router-dom';
import "./MainPage.css"

export default function MainPage() {
  
  const loading = useSelector((state) => state.loadingPage);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (error) {
      window.location.reload();
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
