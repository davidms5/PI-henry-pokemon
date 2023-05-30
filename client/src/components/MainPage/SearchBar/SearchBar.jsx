import { useState, useEffect } from "react"
import { setAlphabeticOrder, setNameFilter, setSourceFilter, setTypeFilter, setOrderAttack } from "../../../store/actions";
import { useDispatch, } from "react-redux";
import axios from "axios";
export default  function SearchBar (){

    useEffect(() => {
        dispatch(setNameFilter(""));
        dispatch(setTypeFilter(""));
        dispatch(setAlphabeticOrder("default"));
        dispatch(setSourceFilter(""));
        dispatch(setOrderAttack(""))
    }, [])

    useEffect(() =>{
        const fetchPokemonTypes = async () => {
            try {
              const response = await axios.get(
                process.env.REACT_APP_API_URL || "http://localhost:3001/types"
              );
              setType(response.data);
            } catch (error) {
              console.error("Failed to fetch pokemon types:", error);
            }
          };
      
          fetchPokemonTypes();
    }, [])
    //const nameFilter = useSelector((state) => state.nameFilter)

    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterSource, setFilterSource] = useState("");
    const [filterType, setFilterType] = useState("");
    const [type, setType] = useState([])
    const [letterOrder, setLetterOrder] = useState("default");
    const [sortingAttack, setSortingAttack] = useState("");
    
    const handleNameFilter =(e) =>{
        e.preventDefault();

        dispatch(setNameFilter(searchQuery));

        dispatch(setSourceFilter(filterSource));
        
        dispatch(setTypeFilter(filterType));

        dispatch(setAlphabeticOrder(letterOrder));

        dispatch(setOrderAttack(sortingAttack));
    };

    const handleReset = () => {
        setSearchQuery("");
        setFilterSource("");
        setFilterType("");
        setLetterOrder("default");
        setSortingAttack("");
      };

    return (
        <div>
            <h2>soy una searchBar</h2>
            <form onSubmit={handleNameFilter}>

                <input type="text" placeholder="enter pokemon name" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} />

                <button type="submit">search</button>

                <label htmlFor="fuente">Fuente: </label>
                <select value={filterSource} onChange={event => setFilterSource(event.target.value)}>
                    <option value="">todo</option>
                    <option value="api">pokedex</option>
                    <option value="database">creados</option>
                </select>

                <label htmlFor="tipo">Tipo: </label>
                <select value={filterType} onChange={event => setFilterType(event.target.value)}>
                    <option key="all" value="all">All</option>
                    {type.map((tipos, index) =>
                        
                        <option key={index} value={tipos.NOMBRE}>
                            {tipos.NOMBRE}
                        </option>
                            
                        )}
                </select>

                <label htmlFor="orden alfabetico"> Orden Alfabetico</label>
                <select value={letterOrder} onChange={event => setLetterOrder(event.target.value)}>
                    <option value="default">normal</option>
                    <option value="descendente">descendente</option>
                    <option value="ascendente">ascendente</option>
                </select>

                <label htmlFor="orden ataque">Orden Ataque</label>
                <select value={sortingAttack} onChange={event => setSortingAttack(event.target.value)}>
                    <option value="default">normal</option>
                    <option value="descendente">mayor ataque</option>
                    <option value="ascendente">menor ataque</option>
                </select>
               
               <button onClick={handleReset}>
                reset a valores por defecto
               </button>
            </form>
        </div>
    )
}