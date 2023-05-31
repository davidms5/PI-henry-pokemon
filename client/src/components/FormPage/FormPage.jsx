import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addCreatedPokemon } from "../../store/actions";
export default function FormPage(){

  const dispatch = useDispatch();
  const type = useSelector((state) => state.pokemonTypes);

  const [selectedImage, setSelectedImage] = useState(null);

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

  const [formErrors, setFormErrors] = useState({
    nombre: '',
    vida: '',
    ataque: '',
    defensa: '',
    velocidad: '',
    altura:'',
    peso:'',
    tipos: '',
    imagen: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'nombre') {
      if (value.trim() === '') {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          nombre: 'Nombre no puede estar vacio',
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          nombre: '',
        }));
      }
    } else if (['vida', 'ataque', 'defensa', 'velocidad', 'altura', 'peso'].includes(name)) {
      if (value < 5 || value > 500) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: 'valor no puede ser menor a 5 o mayor a 500',
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
      }
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTypeChange = (event) => {
    const { name, value } = event.target;
    const selectedTypes = formData.tipos;
  
    if (selectedTypes.includes(value)) {
      const updatedTypes = selectedTypes.filter((type) => type !== value);
      setFormData((prevData) => ({
        ...prevData,
        tipos: updatedTypes.length === 0 ? [] : updatedTypes,
      }));
    } else {
      if (selectedTypes.length >= 2) {
        alert("solo puedes seleccionar maximo 2 tipos a la vez")
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "solo puedes seleccionar maximo 2 tipos a la vez"
        }))
      }
      setFormData((prevData) => {
        const newTypes = [...prevData.tipos, value];
        return {
          ...prevData,
          tipos: newTypes.length > 2 ? newTypes.slice(-2) : newTypes,
        };
      });
    }
  };
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    

    if (formData.vida < 1 || formData.vida > 500 || formData.ataque < 1 || formData.ataque > 500 ||
      formData.defensa < 1 || formData.defensa > 500 || formData.velocidad < 1 || formData.velocidad > 500) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          vida: 'Input value must be between 1 and 500',
          ataque: 'Input value must be between 1 and 500',
          defensa: 'Input value must be between 1 and 500',
          velocidad: 'Input value must be between 1 and 500',
        }));
        return;


    }

    if (selectedImage && selectedImage.size > 6 * 1024 * 1024) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        imagen: 'Image size must be less than 6 MB.',
      }));
      return;
    }

    try {
      
      const newPokemon = await axios.post(process.env.REACT_APP_API_URL || 'http://localhost:3001/pokemons', formData); 

      
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

      setFormErrors({
        nombre: '',
        vida: '',
        ataque: '',
        defensa: '',
        velocidad: '',
        altura:'',
        peso:'',
        tipos: '',
      })

      // Display a success message or redirect to another page
      dispatch(addCreatedPokemon({...newPokemon.data, Types: formData.tipos}))
      alert("pokemon creado con exito!");
    } catch (error) {
      
      console.error('Failed to create a new Pokemon:', error);
    }
  };
    
    return (
        <div>formulario pokemon
          <Link to="/pokemon"><button>go back</button></Link>
          <h2>Create a New Pokemon</h2>
        {console.log(formData.tipos)}
      <form onSubmit={handleSubmit}>
        {/* ir viendo y agregando excepciones */}
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} />
        {formErrors.nombre && <p>{formErrors.nombre}</p>}

        <label htmlFor="vida">HP:</label>
        <input type="number" id="vida" name="vida" value={formData.vida} onChange={handleInputChange} />
        {formErrors.vida && <p>{formErrors.vida}</p>}

        <label htmlFor="ataque">Ataque:</label>
        <input type="number" id="ataque" name="ataque" value={formData.ataque} onChange={handleInputChange} />
        {formErrors.ataque && <p>{formErrors.ataque}</p>}

        <label htmlFor="defensa">Defensa:</label>
        <input type="number" id="defensa" name="defensa" value={formData.defensa} onChange={handleInputChange} />
        {formErrors.defensa && <p>{formErrors.defensa}</p>}

        <label htmlFor="velocidad">Velocidad:</label>
        <input type="number" id="velocidad" name="velocidad" value={formData.velocidad} onChange={handleInputChange} />
        {formErrors.velocidad && <p>{formErrors.velocidad}</p>}

        <label htmlFor="altura">Altura:</label>
        <input type="number" id="altura" name="altura" value={formData.altura} onChange={handleInputChange} />
        {formErrors.altura && <p>{formErrors.altura}</p>}

        <label htmlFor="peso">Peso:</label>
        <input type="number" id="peso" name="peso" value={formData.peso} onChange={handleInputChange} />
        {formErrors.peso && <p>{formErrors.peso}</p>}

        <label htmlFor="tipos">Tipos:</label>
        <select multiple id="tipos" name="tipos" value={formData.tipos} onChange={handleTypeChange}>
          {type.map((tipos, index) =>
                        
              <option key={index} value={tipos} >
                  {tipos}
              </option>
                  
              )}
          {/* modificarlo para que solo acepte minimo 2 y hacerlo dinamico e incluir opcion de imagen*/}
        </select>

        <label htmlFor="imagen">Imagen:</label>
        <input type="file" id="imagen" name="imagen" onChange={handleImageChange} />
        {formErrors.imagen && <p>{formErrors.imagen}</p>}

            <h2>quedaria probar si funciona y agregar el resto de logica para subir una imagen y verificar que sea una imagen </h2>
        <button type="submit">Crear Pokemon</button>
      </form>
        </div>
        
    )
}
