import styled from "styled-components";

export const FormContainer = styled.div`
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

    h2{
        font-size: 24px;
        color: yellow;
        -webkit-text-stroke: 2px blue;
        text-shadow: 2px 2px 0 blue;
    };

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-bottom: 10px;
    };

    p{
        font-weight: bold;
    }

    label{
        font-weight: bold;
        box-sizing: border-box;
    };

    input {
        padding: 5px;
        margin-bottom: 5px;
        box-sizing: border-box;
    };

    select{
        
        padding: 5px;
        margin-bottom: 5px;
        box-sizing: border-box;
        height: auto;
        appearance: none;
        border: 2px solid blue;
        border-radius: 5px;
        background-color: transparent;
        color: white;
    }

    option{
        background-color: rgba(255, 255, 255, 0.2);
        padding: 5px;
        border-radius: 5px;
    }

    button {
        font-size: 16px;
        color: blue;
        text-shadow: 1px 1px 0 blue;
        background-color: yellow;
        border: 2px solid blue;
        padding: 8px 15px;
        cursor: pointer;
        border-radius: 5px;
    }

    .selected-image {
    max-width: 100%;
    height: auto;
    margin-top: 10px;
     };

    .loading-icon{
        width: 35%;
        height: 35%;
        
    }
`;

export const GridTypes = styled.div`
    
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 10px; 

`;

export const ImageIcons = styled.img`
    cursor: pointer;
    max-width: 100%;
    height: auto;
    margin-right: 5px;

`
