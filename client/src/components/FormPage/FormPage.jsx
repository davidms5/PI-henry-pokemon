import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPokemon } from "../../store/actions";

export default function FormPage(){

  const dispatch = useDispatch();
  //useEffect(() => {
  //  dispatch(fetchPokemon());//mover este dispatch para realizarlo despues de creado el pokemon
  //}, [])
    
    return (
        <div>formulario pokemon
          <Link to="/pokemon"><button>go back</button></Link>
        </div>
        
    )
}