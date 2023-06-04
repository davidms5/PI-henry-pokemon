import styled from "styled-components";

export const MainPageContainer = styled.div`
    margin-bottom: 10%;

`;

export const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 0, 0.4);
    border: 3px solid blue;
    padding: 20px;
    max-width: clamp(200px, 70vw, 600px);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
    max-width: 100%;
    height: auto;
    }
`;