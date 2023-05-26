import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const redirectToPokemonList = () => {
    navigate("/pokemon");
  };

  return (
    <div>
        hola mundo
        <br />
      <button onClick={redirectToPokemonList}>
        Show Pokemon List
      </button>
    </div>
  );
}

export default LandingPage;
