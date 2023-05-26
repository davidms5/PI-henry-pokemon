import { useNavigate, Link } from "react-router-dom"

export default function FormPage(){

    //const navigate = useNavigate();
//
    //const goBack = () =>{
    //    navigate(-1)
    //}
    return (
        <div>formulario pokemon
          <Link to="/pokemon"><button>go back</button></Link>
        </div>
        
    )
}