import styled, {css} from "styled-components";

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  
  

  .custom-link{
    text-decoration: none;
    color: blue;
    font-weight: bold;
  }
  
`;

export const ButtonPage = styled.button`
        cursor: pointer;
        color: blue;
        text-shadow: 1px 0 0 blue;
        background-color: yellow;
        border: 2px solid blue;
        border-radius: 5px;
        ${props =>
      props.disabled &&
      css`
      background-color: #6c757d;
      color: #ffffff;
      cursor: auto`}
`