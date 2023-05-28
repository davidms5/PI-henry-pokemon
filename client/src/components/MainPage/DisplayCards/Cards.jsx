import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "../../../store/actions";
import Card from "./Card/Card";
import { filterPokemon, sortPokemon } from "./cardsLogic";

export default function Cards(){

    const dispatch = useDispatch();
    const pokemon = useSelector((state) => state.pokemonAPI);
    const filterName = useSelector((state) => state.nameFilter);
    const filterSource = useSelector((state) => state.sourceFilter);
    const filterType = useSelector((state) => state.typeFilter);
    const sortOrder = useSelector((state) => state.alphabeticFilter);
    const filterAttack = useSelector((state) => state.attack);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        if (pokemon.length === 0) {
          dispatch(fetchPokemon());
        }
      }, [dispatch, pokemon]);

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
        { currentPokemon.length > 0?
            currentPokemon.map((p, index) => (
            <div key={index}>
            <Card pokemon={p} />
            </div>
            )) : <p>ningun pokemon encontrado</p>
        }

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