import styled from "styled-components";

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