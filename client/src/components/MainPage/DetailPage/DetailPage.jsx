import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DetailPage(){

    const [pokemonDetail, setPokemonDetail] = useState({})

    const {nombre} = useParams();

    useEffect(() => {
        const fetchPokemonDetail = async () => {
          try {
            const response = await axios.get(
              `http://localhost:3001/pokemons/?name=${nombre}`
            );
            setPokemonDetail(response.data);
          } catch (error) {
            console.log("Error fetching Pokemon detail:", error);
          }
        };
    
        fetchPokemonDetail();
      }, [nombre]);
    return (
        <div>

            <h2>nombre: {pokemonDetail.nombre}</h2>
            <p>ID: {pokemonDetail.id}</p>
            <img src={pokemonDetail.imagen} alt={`${nombre}`} />
            <p>vida: {pokemonDetail.vida}</p>
            <p>ataque: {pokemonDetail.ataque}</p>
            <p>defensa: {pokemonDetail.defensa}</p>
            <p>velocidad: {pokemonDetail.velocidad}</p>
            <p>altura: {pokemonDetail.altura}</p>
            <p>peso: {pokemonDetail.peso}</p>
            <p>tipo: {pokemonDetail.Types && pokemonDetail.Types.join(", ")}</p>
            <br />
            
            <Link to="/pokemon"><button>go back</button></Link>
        </div>
    )
}