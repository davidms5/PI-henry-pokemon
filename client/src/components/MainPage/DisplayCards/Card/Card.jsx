import { CardContainer, CardImage } from "./CardStyles";

export default function Card(props){

    const {imagen, nombre, Types} = props.pokemon;
    return (
        <CardContainer>
        <div >

        <CardImage src={imagen} alt={nombre} />
            <br />
            {nombre}
            <br />
          <p>{Types.join(", ")} </p>

        </div>
        
        </CardContainer>
    )
}