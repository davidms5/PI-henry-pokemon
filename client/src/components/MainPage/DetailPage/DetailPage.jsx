import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
//import "./DetailPage.css";
import { DetailContainer, Stat, ImageContainer, PokemonImage, StatsContainer, ProgressBar, ProgressBarFill, ImageType } from "./DetailPageStyles";

import { iconTypes } from "../../iconTypes";

export default function DetailPage(){

  const renderTypeImages = () => {
    return pokemonType.map((type, index) => (
      <ImageType key={index} src={process.env.PUBLIC_URL + iconTypes[type]} alt={type} />
    ));
  };

    const [pokemonDetail, setPokemonDetail] = useState({})
    const [pokemonType, setPokemonType] = useState([])
    const {nombre} = useParams();
    const urlDetail = "http://localhost:3001/pokemons" ||process.env.REACT_APP_API_URL //cambio

    useEffect(() => {
        const fetchPokemonDetail = async () => {
          try {
            const response = await axios.get(
              `${urlDetail}/?name=${nombre}`
            );
            setPokemonDetail(response.data);
            setPokemonType(response.data.Types);

          } catch (error) {
            console.log("Error fetching Pokemon detail:", error);
          }
        };
    
        fetchPokemonDetail();
      }, [nombre]);
    return (
      <DetailContainer>
      <h2>nombre: {pokemonDetail.nombre}</h2>
      <p className="idPokemon">ID: {pokemonDetail.id}</p>
      <ImageContainer>
        <PokemonImage src={pokemonDetail.imagen} alt={pokemonDetail.nombre} />
      </ImageContainer>
      <StatsContainer>
        
        <Stat>
          <p>vida: {pokemonDetail.vida}</p>
          <ProgressBar>
            <ProgressBarFill
              style={{ width: `${pokemonDetail.vida / 2}%` }}
            />
          </ProgressBar>
        </Stat>
        <Stat>
          <p>ataque: {pokemonDetail.ataque}</p>
          <ProgressBar>
            <ProgressBarFill
              style={{ width: `${pokemonDetail.ataque / 2}%` }}
            />
          </ProgressBar>
        </Stat>
        <Stat>
          <p>defensa: {pokemonDetail.defensa}</p>
          <ProgressBar>
            <ProgressBarFill
              style={{ width: `${pokemonDetail.defensa / 2}%` }}
            />
          </ProgressBar>
        </Stat>
        <Stat>
          <p>velocidad: {pokemonDetail.velocidad}</p>
          <ProgressBar>
            <ProgressBarFill
              style={{ width: `${pokemonDetail.velocidad / 2}%` }}
            />
          </ProgressBar>
        </Stat>
        <Stat>
          <p>altura: {pokemonDetail.altura}</p>
          <ProgressBar>
            <ProgressBarFill
              style={{ width: `${pokemonDetail.altura / 2}%` }}
            />
          </ProgressBar>
        </Stat>
        <Stat>
          <p>peso: {pokemonDetail.peso}</p>
          <ProgressBar>
            <ProgressBarFill
              style={{ width: `${pokemonDetail.peso / 20}%` }}
            />
          </ProgressBar>
        </Stat>
        <div >
          {pokemonType.map((type, index) => (
      <ImageType key={index} src={process.env.PUBLIC_URL + iconTypes[type]} alt={type} />
    ))}
          <p>tipo: {pokemonDetail.Types && pokemonDetail.Types.join(", ")}</p>
        </div>
      </StatsContainer>
      <br />
      <Link to="/pokemon">
        <button>go back</button>
      </Link>
    </DetailContainer>
    )
}