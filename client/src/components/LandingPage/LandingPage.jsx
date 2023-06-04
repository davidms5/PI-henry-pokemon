import React from "react";
import { useNavigate } from "react-router-dom";
import { LandingContainer } from "./LandingPage";

function LandingPage() {
  const navigate = useNavigate();

  const redirectToPokemonList = () => {
    navigate("/pokemon");
  };

  return (
    <LandingContainer>
        <h1>A Henry Pokemon Project</h1>
       <img src={process.env.PUBLIC_URL + "/fonts/pokemon-logo-png-0.png"} alt="pokemon logo" />
        <br />
      <button onClick={redirectToPokemonList}>
        Ingresar
      </button>
    </LandingContainer>
  );
}

export default LandingPage;
