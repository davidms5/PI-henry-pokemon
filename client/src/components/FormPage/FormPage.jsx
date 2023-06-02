import { Link } from "react-router-dom";
import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addCreatedPokemon } from "../../store/actions";
import { handleTypeChanges, handlerImageChanges, handlerInputChanges, prepareFormData } from "./FormPageValidations";
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
   handlerInputChanges(event, setFormData, setFormErrors)
  };

  const handleTypeChange = (event) =>(
    handleTypeChanges(event, formData, setFormData, setFormErrors)
  )
  
  
  const handleImageChange = (event) => {
    
    handlerImageChanges(event, setSelectedImage)
   
  };

  //function for range validation boolean
  const isValidRange = (value) => value >= 1 && value <= 500;


  const handleSubmit = async (event) => {
    event.preventDefault();

    const { nombre, vida, ataque, defensa, velocidad, altura, peso } = formData;
    //limit size for the image
    const maxImageSizeInBytes = 6 * 1024 * 1024;

    if (
    !isValidRange(vida) ||
    !isValidRange(ataque) ||
    !isValidRange(defensa) ||
    !isValidRange(velocidad) ||
    !isValidRange(altura) ||
    !isValidRange(peso) || /^\d/.test(nombre)
      ) {
    setFormErrors({
      nombre: "el valor no puede estar vacio y no puede empezar por numeros",
      vida: 'El valor debe ser entre 1 y 500',
      ataque: 'El valor debe ser entre 1 y 500',
      defensa: 'El valor debe ser entre 1 y 500',
      velocidad: 'El valor debe ser entre 1 y 500',
      altura: 'El valor debe ser entre 1 y 500',
      peso: 'El valor debe ser entre 1 y 500',
      });
    return;
    }


    if (selectedImage && selectedImage.size > maxImageSizeInBytes) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        imagen: 'la imagen debe tener un peso menor a 6 MB.',
      }));
      return;
    }

    try {
      
      const postData = prepareFormData(formData, selectedImage);
      
      
      const newPokemon = await axios.post(process.env.REACT_APP_API_URL || 'http://localhost:3001/pokemons', postData); 

      
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
        
      <form onSubmit={handleSubmit}>
        {/* ir viendo y agregando excepciones */}
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} />
        {formErrors.nombre && <p>{formErrors.nombre}</p>}

        <label htmlFor="vida">HP:</label>
        <input type="number" id="vida" name="vida" value={formData.vida || ""} onChange={handleInputChange} />
        {formErrors.vida && <p>{formErrors.vida}</p>}

        <label htmlFor="ataque">Ataque:</label>
        <input type="number" id="ataque" name="ataque" value={formData.ataque || ""} onChange={handleInputChange} />
        {formErrors.ataque && <p>{formErrors.ataque}</p>}

        <label htmlFor="defensa">Defensa:</label>
        <input type="number" id="defensa" name="defensa" value={formData.defensa || ""} onChange={handleInputChange} />
        {formErrors.defensa && <p>{formErrors.defensa}</p>}

        <label htmlFor="velocidad">Velocidad:</label>
        <input type="number" id="velocidad" name="velocidad" value={formData.velocidad || ""} onChange={handleInputChange} />
        {formErrors.velocidad && <p>{formErrors.velocidad}</p>}

        <label htmlFor="altura">Altura:</label>
        <input type="number" id="altura" name="altura" value={formData.altura || ""} onChange={handleInputChange} />
        {formErrors.altura && <p>{formErrors.altura}</p>}

        <label htmlFor="peso">Peso:</label>
        <input type="number" id="peso" name="peso" value={formData.peso || ""} onChange={handleInputChange} />
        {formErrors.peso && <p>{formErrors.peso}</p>}

        <label htmlFor="tipos">Tipos:</label>
        <select multiple id="tipos" name="tipos"  value={formData.tipos} onChange={handleTypeChange}>
          {type.map((tipos, index) =>
                        
              <option key={index} value={tipos} >
                  {tipos}
              </option>
                  
              )}
          {/*  hacerlo dinamico e incluir opcion de imagen y validaciones javascript para imagenes*/}
        </select>

        <label htmlFor="imagen">Imagen:</label>
        <input type="file" id="imagen" name="imagen"  onChange={handleImageChange} />
          {formErrors.imagen && <p>{formErrors.imagen}</p>}

            
        <button type="submit">Crear Pokemon</button>
      </form>
        </div>
        
    )
}
