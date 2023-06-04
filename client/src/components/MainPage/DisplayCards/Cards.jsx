import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import Card from "./Card/Card";
import { filterPokemon, sortPokemon } from "./cardsLogic";
import { CardContainer } from "./CardsStyles";

export default function Cards(){

    //const dispatch = useDispatch();
    const pokemon = useSelector((state) => state.pokemonAPI);
    const filterName = useSelector((state) => state.nameFilter);
    const filterSource = useSelector((state) => state.sourceFilter);
    const filterType = useSelector((state) => state.typeFilter);
    const sortOrder = useSelector((state) => state.alphabeticFilter);
    const filterAttack = useSelector((state) => state.attack);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    //set to page 1 if filter is applied
    useEffect(() => {
      setCurrentPage(1);
    }, [filterName, filterSource, filterType, sortOrder, filterAttack]);
   

      const filteredPokemon = filterPokemon(pokemon, filterName, filterSource, filterType);

      const sortedPokemonCombined = sortPokemon(filteredPokemon, sortOrder, filterAttack);

      //pagination logic
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentPokemon = sortedPokemonCombined.slice(
        indexOfFirstItem,
        indexOfLastItem
        );

      const totalPages = Math.ceil(sortedPokemonCombined.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

    return (

      
      <div>
        <div>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
              <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
              >
              {page}
              </button>
                )
            )}
        </div>
        <br />
        <CardContainer>
        { currentPokemon.length > 0?
            currentPokemon.map((p, index) => (
            <div key={index}>
              <Link to={`/pokemon/${p.nombre}`} className="custom-link">
                <Card pokemon={p} />
              </Link>
            
            </div>
            )) : <p>ningun pokemon encontrado</p>
        }
        </CardContainer>

          <br />
          <div>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
              <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
              >
              {page}
              </button>
                )
            )}
        </div>
      </div>

    )
}