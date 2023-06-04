import styled from "styled-components";

export const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: rgba(255, 255, 0, 0.4);
    border: 3px solid blue;
    width: 100%;
    box-sizing: border-box;
    button {
        
        color: blue;
        text-shadow: 1px 1px 0 blue;
        background-color: yellow;
        border: 2px solid blue;
        padding: 7px 15px;
        cursor: pointer;
        border-radius: 5px;
    }
    h2{
        color: yellow;
       
        text-shadow: 2px 2px 0 blue;
        margin-bottom: 20px;
        };
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  margin-bottom: 20px;
`;

export const PokemonImage = styled.img`
  max-width: 100%;
  height: auto;
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

export const Stat = styled.div`
  position: relative;
`;

export const ProgressBar = styled.div`
  height: 10px;
  background-color: #ccc;
  border-radius: 5px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div`
  height: 100%;
  background: linear-gradient(to right, #4caf50, #8bc34a);
`;

export const ImageType = styled.img`
  max-width: 50px;
  max-height: 50px;
`