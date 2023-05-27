import { useState, useEffect } from "react"
import { setNameFilter } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
export default  function SearchBar (){

    useEffect(() => {
        dispatch(setNameFilter(""))
    }, [])
    //const nameFilter = useSelector((state) => state.nameFilter)
    //aplicar aqui una regla de que si el nombre del input no coincide con el pokemon del array, no manda el cambio
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.pokemonAPI);
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (e) =>{
        setSearchQuery(e.target.value);
    };

    const handleNameFilter =(e) =>{
        e.preventDefault()
        dispatch(setNameFilter(searchQuery))
    }
    return (
        <div>
            <h2>soy una searchBar</h2>
            <input type="text" placeholder="enter pokemon name" value={searchQuery} onChange={handleInputChange} />
            <button onClick={handleNameFilter}>search</button>
        </div>
    )
}