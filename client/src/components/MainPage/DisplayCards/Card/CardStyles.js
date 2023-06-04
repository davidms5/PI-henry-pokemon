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
  p{
    margin-top: 0;
  }
`;

export const CardImage = styled.img`
  max-width: 80%;
  max-height: 85%;
  object-fit: contain;
`;

export const ImageType = styled.img`
  max-width: 50px;
  max-height: 50px;
`