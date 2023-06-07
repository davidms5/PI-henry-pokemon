// handler for the array of types
export const handleTypeChanges = (event, formData, setFormData, setFormErrors) => {
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

//handler for the data

export const handlerInputChanges = (event, setFormData, setFormErrors) => {
    const { name, value } = event.target;

    if (name === 'nombre') {
      if (value.trim() === '') {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          nombre: 'Nombre no puede estar vacio',
        }));
      } else if (/^\d/.test(value)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          nombre: 'Nombre no puede comenzar con números',
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
          [name]: 'el valor no puede ser menor a 5 o mayor a 500',
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

//handler for the images
export const handlerImageChanges = (event, setSelectedImage) => {
    const file = event.target.files[0];

    if (file) {
    const fileType = file.type;
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg']; 
    const validMaxSizeInBytes = 6 * 1024 * 1024;

    if (!validImageTypes.includes(fileType)) {
      
      alert('Por favor inserte una imagen tipo: (JPEG, PNG, JPG).');
      event.target.value = null; 
      return;
    };

    if (file.size > validMaxSizeInBytes) {
      alert('la imagen seleccionada en muy grande. seleccione una imagen menor a 6MB.');
      event.target.value = null;
      return;
    }
    setSelectedImage(file);
   };
   
  };

//handler to set the data with the image
export const prepareFormData = (formData, selectedImage) => {
    const postData = new FormData();
    postData.append('nombre', formData.nombre);
    postData.append('vida', formData.vida);
    postData.append('ataque', formData.ataque);
    postData.append('defensa', formData.defensa);
    postData.append('velocidad', formData.velocidad);
    postData.append('altura', formData.altura);
    postData.append('peso', formData.peso);
    formData.tipos.forEach((tipo) => postData.append('tipos[]', tipo));
  
    if (selectedImage !== null) {
      postData.append('imagen', selectedImage);
    }
  
    return postData;
  };
