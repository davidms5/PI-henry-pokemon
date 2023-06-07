import { Link, useNavigate } from "react-router-dom";
import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addCreatedPokemon } from "../../store/actions";
import { handleTypeChanges, handlerImageChanges, handlerInputChanges, prepareFormData } from "./FormPageValidations";
import { FormContainer, GridTypes, ImageIcons } from "./FormStyles";
import { iconTypes } from "../iconTypes";

export default function FormPage(){

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const type = useSelector((state) => state.pokemonTypes);

  const [selectedImage, setSelectedImage] = useState(null);

  const [errorMessageBack, setErrorMessageBack] = useState(false);

  const [loading, setLoading] = useState(false);

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

    setErrorMessageBack(false);

    

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
      nombre: "el valor no puede estar vacio y no puede empezar con numeros",
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
      setLoading(true);
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
      });

      setSelectedImage(null);

      
      dispatch(addCreatedPokemon({...newPokemon.data, Types: formData.tipos}))
      alert("pokemon creado con exito!");
      setLoading(false);
      navigate("/pokemon");

    } catch (error) {
      
      console.error('Failed to create a new Pokemon:', error);
      setErrorMessageBack(true)
    }
  };
    
    return (
        <FormContainer>
           
          <h2>Nuevo Pokemon</h2>
          <Link to="/pokemon"><button>go back</button></Link>
        
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
        <GridTypes >
          {type.map((tipo, index) => (
            <label key={index}>
              <input
                type="checkbox"
                name="tipos"
                value={tipo}
                checked={formData.tipos.includes(tipo)}
                onChange={handleTypeChange}
              />
               <ImageIcons src={iconTypes[tipo]} alt={tipo} />
              {tipo}
            </label>
          ))}
        </GridTypes>

            <br />
        <label htmlFor="imagen">Imagen:</label>
        <br />
        <input type="file" id="imagen" name="imagen"  onChange={handleImageChange} style={{ display: "none" }}/>
          {formErrors.imagen && <p>{formErrors.imagen}</p>}
          <button htmlFor="imagen" type="button" onClick={() => document.getElementById('imagen').click()}>elige una imagen</button>

          <br />
          {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected Image"
            className="selected-image"
          />
        )}
        <br />
        <button type="submit">Crear Pokemon</button>
      </form>
          
          
      {loading && <div >
      <img src={process.env.PUBLIC_URL + "/fonts/pikachu_loading.gif"} alt="loading" className="loading-icon"/>
      <br />
      <h3>Loading...</h3>
      </div>}

      {errorMessageBack && <h4>hubo un error en el servidor, intente de nuevo mas tarde</h4>}
      
        </FormContainer>
        
    )
}
