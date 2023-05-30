import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
export default function FormPage(){

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nombre: '',
    vida: 0,
    ataque: 0,
    defensa: 0,
    velocidad: 0,
    altura: 0,
    peso: 0,
    tipos: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTypeChange = (event) => {
    const { value } = event.target;
    if(formData.tipos.length === 2){
      return "numero maximo de tipos";
    }
    setFormData((prevData) => ({ ...prevData, types: [...prevData.types, value] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      
      await axios.post('http://localhost:3001/pokemons', formData); //usar aqui tambien .env

      
      setFormData({
        nombre: '',
        vida: 0,
        ataque: 0,
        defensa: 0,
        velocidad: 0,
        altura: 0,
        peso: 0,
        tipos: [],
      });

      // Display a success message or redirect to another page
      alert("pokemon creado con exito!");
    } catch (error) {
      
      console.error('Failed to create a new Pokemon:', error);
    }
  };

  //useEffect(() => {
  //  dispatch(fetchPokemon());//cambiar esta opcion para aplicar un ultimo action, que llame al ultimo pokemon creado y lo una al array the pokemon API
  //}, [])
    
    return (
        <div>formulario pokemon
          <Link to="/pokemon"><button>go back</button></Link>
          <h2>Create a New Pokemon</h2>

      <form onSubmit={handleSubmit}>
        {/* ir viendo y agregando excepciones */}
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} />

        <label htmlFor="vida">HP:</label>
        <input type="number" id="vida" name="vida" value={formData.vida} onChange={handleInputChange} />

        <label htmlFor="ataque">Ataque:</label>
        <input type="number" id="ataque" name="ataque" value={formData.ataque} onChange={handleInputChange} />

        <label htmlFor="defensa">Defensa:</label>
        <input type="number" id="defensa" name="defensa" value={formData.defensa} onChange={handleInputChange} />

        <label htmlFor="velocidad">Velocidad:</label>
        <input type="number" id="velocidad" name="velocidad" value={formData.velocidad} onChange={handleInputChange} />

        <label htmlFor="altura">Altura:</label>
        <input type="number" id="altura" name="altura" value={formData.altura} onChange={handleInputChange} />

        <label htmlFor="peso">Peso:</label>
        <input type="number" id="peso" name="peso" value={formData.peso} onChange={handleInputChange} />

        <label htmlFor="tipos">Tipos:</label>
        <select multiple id="tipos" name="tipos" value={formData.tipos} onChange={handleTypeChange}>
          <option value="grass">Grass</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          {/* modificarlo para que solo acepte minimo 2 y hacerlo dinamico e incluir opcion de imagen*/}
        </select>

        <button type="submit">Crear Pokemon</button>
      </form>
        </div>
        
    )
}
