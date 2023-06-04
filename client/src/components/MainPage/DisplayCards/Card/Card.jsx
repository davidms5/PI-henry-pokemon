import { CardContainer, CardImage, ImageType } from "./CardStyles";
import {iconTypes} from "../../../iconTypes";
export default function Card(props){

    const {imagen, nombre, Types} = props.pokemon;

    const renderTypeImages = () => {
        return Types.map((type, index) => (
          <ImageType key={index} src={process.env.PUBLIC_URL + iconTypes[type]} alt={type} />
        ));
      };

    return (
        <CardContainer>
        <div >

        <CardImage src={imagen} alt={nombre} />
            <br />
            {nombre}
            <br />
            {renderTypeImages()}
          <p>{Types.join(", ")} </p>
            
        </div>
        
        </CardContainer>
    )
}