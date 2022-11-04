import styled from 'styled-components'

export const PageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100vw;
    max-width: 100%;
    overflow-x: hidden;
`

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 1;
    min-height: 100vh;
    width: 100vw;
    min-width: 100%;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    /* padding-top: 60px; */
`
export const PageRow = styled.div`
    display: grid;
    grid-auto-columns: minmax(auto, 1fr);
    align-items: center;
    justify-content: center;
    grid-template-areas:'col1 col2';
    width: 90%;
    height: fit-content;
    max-width: 100%;

    @media screen and (max-width: 1100px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`
export const PageColumn1 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    grid-area: col1;
    height: 100%;
    overflow: hidden;

    @media screen and (max-width: 1100px) {
        max-width: 90%;
        width: 90%;
    }
`
export const PageColumn2 = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    grid-area: col2;
    overflow: hidden;

    @media screen and (max-width: 1100px) {
        max-width: 90%;
    }
`
export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;

    @media screen and (max-width: 768px) {
        margin-right: auto;
        margin-left: auto;
        margin: 0 10px;
    }
`
export const Heading = styled.h1`
    font-family: Inter;
    letter-spacing: -5px;
    font-size: 48px;

    @media screen and (max-width: 768px) {
        text-align: center;
        letter-spacing: -3px;
        font-size: 35px;
    }

    @media screen and (max-width: 480px) {
        font-size: 28px;
        letter-spacing: -1px;
        text-align: center;
    }
`
export const Paragraph = styled.p`
    width: 100%;
    margin-bottom: 20px;
    font-size: 18px;
    line-height: 16px;
    font-family: Inter;
    letter-spacing: -1px;

    @media screen and (max-width: 768px) {
        text-align: justify;
        margin-right:auto;
        margin-left:auto;
        font-size: 13px;
        text-align: center;
    }

    @media screen and (max-width: 480px) {
        text-align: justify;
        font-size: 12px;
        margin-right:auto;
        margin-left:auto;
        text-align: center;
    }
`
export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;

    @media screen and (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: justify;
    }

    @media screen and (max-width: 480px) {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: justify;
    }
`
export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: black;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    color: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    transition: 0.2s ease-in-out;
    font-family: Inter;
    font-weight: 600;
    letter-spacing: -0.8px;
    margin: 5px 5px;
    min-width: 20%;

    &:active {
        transform: scale(0.9);
        box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
    }

    &:hover {
        background:#373738;
        /* color: black; */
        transition: 0.2s ease-in-out;
    }
`
export const ImgWrapper = styled.div`
    display: flex;
    overflow: hidden;
    height: fit-content;
    width: fit-content;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
        margin-left: auto;
        margin-right: auto;
    }
`

export const Img = styled.img`
    position: relative;
    height:200px;
    width: 200px;
    margin: 0 0 10px 0;
    padding-right: 0;
`