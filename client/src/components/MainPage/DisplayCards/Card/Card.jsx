export default function Card(props){

    const {imagen, nombre, Types} = props.pokemon;
    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", border:"3px solid blue", marginBottom:"3px"}}>

        <img src={imagen} alt={nombre} />
            <br />
            {nombre}
            <br />
          <p>{Types.join(", ")} </p>

        </div>
    )
}