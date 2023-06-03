import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const redirectToPokemonList = () => {
    navigate("/pokemon");
  };

  return (
    <div>
       <h1>bienvenido a Pokemon!</h1>
        <br />
      <button onClick={redirectToPokemonList}>
        Ingresar
      </button>
    </div>
  );
}

export default LandingPage;
