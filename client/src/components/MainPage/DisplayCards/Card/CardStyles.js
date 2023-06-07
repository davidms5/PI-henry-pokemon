import styled from "styled-components";

export const CardContainer = styled.div`
  width: 300px; /* Adjust the width as needed */
  height: 400px; /* Adjust the height as needed */
  border: 3px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 0, 0.4);
  transition: transform 0.2s ease;
  p{
    margin-top: 0;
  }

  :hover{
    transform: scale(1.1);
  }
`;

export const CardImage = styled.img`
  max-width: 70%;
  max-height: 70%;
  object-fit: contain;
`;

export const ImageType = styled.img`
  max-width: 50px;
  max-height: 50px;
`