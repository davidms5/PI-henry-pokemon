import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "../../../store/actions";
import Card from "./Card/Card";

export default function Cards(){

    const dispatch = useDispatch();
    const pokemon = useSelector((state) => state.pokemonAPI);
    const filterName = useSelector((state) => state.nameFilter);

    useEffect(() => {
        if (pokemon.length === 0) {
          dispatch(fetchPokemon());
        }
      }, [dispatch, pokemon]);

      const filteredPokemon = pokemon
    ? pokemon.filter((p) =>
        p.nombre.toLowerCase().includes(filterName?.toLowerCase() ?? "")
      )
    : [];
    return (
        <div>
      {filteredPokemon.length > 0 ? (
        filteredPokemon.map((p, index) => (
          <div key={index}>
            <Card pokemon={p} />
          </div>
        ))
      ) : (
        pokemon.map((p, index) => (
          <div key={index}>
            <Card pokemon={p} />
          </div>
        ))
      )}
    </div>

    )
}