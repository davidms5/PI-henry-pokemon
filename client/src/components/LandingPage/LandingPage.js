import styled from "styled-components";

export const LandingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    

    h1{
        color: yellow;
        -webkit-text-stroke: 2px blue;
        text-shadow: 2px 2px 0 blue;
        margin-bottom: 20px;
        };

    img {
        max-width: 100%;
        max-height: 450px;
        height: auto;
       
        };

    button {
        
        color: blue;
        text-shadow: 1px 1px 0 blue;
        background-color: yellow;
        border: 2px solid blue;
        padding: 7px 15px;
        cursor: pointer;
        border-radius: 5px;
    }
`
