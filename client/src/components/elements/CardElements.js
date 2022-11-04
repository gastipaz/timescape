import styled from 'styled-components'

export const CardContainer = styled.div`
    height: 250px;
    border-bottom: ${({pathname}) => (pathname === '/' ? 'none' : '1px solid #525252')};
    min-height: 250px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: space-between;
    min-width: 100%;
    width: 100%;
    background: #232234;
    cursor: pointer;
    border-radius: ${({pathname}) => (pathname === '/' ? '10px' : 'none')};
    margin-bottom: ${({pathname}) => (pathname === '/' ? '20px' : '0px')};
    overflow: hidden;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.01);
        transition: all 0.3s ease-in-out;
    }

    @media screen and (min-width: 760px)  and (max-width: 1100px) {
        min-width: 100%;
        height: ${({pathname}) => (pathname === '/search' ? '300px' : '250px')};
    }

    @media screen and (max-width: 468px) {
        min-width: 100%;
    }
`

export const ContentWrapper = styled.div`
    display: flex;
    min-height: 100%;
    max-height: 100%;
    width: 65%;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    overflow: hidden;
    padding: 10px 10px;

    @media screen and (max-width: 768px) {
        
    }

    @media screen and (max-width: 468px) {
        min-height: 100%;
    }
`

export const TextWrapper = styled.div`
    display: flex;
    height: auto;
    width: 100%;
    overflow: hidden;
    white-space: normal;
    flex-flow: row wrap;

    @media screen and (max-width: 768px) {
        
    }

    @media screen and (max-width: 468px) {
        
    }
`

export const Title = styled.h1`
    margin: 0 0;
    font-family: Inter;
    letter-spacing: -2px;
    font-size: 20px;
    color: white;
    text-align: left;

    @media screen and (max-width: 768px) {
        
    }

    @media screen and (max-width: 468px) {
        font-size: 18px;
    }
`

export const Text = styled.p`
    color: #737373;
    font-size: 15px;
    font-family: Inter;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: -1px;
    margin: 0 0;
    text-overflow: ellipsis;
    text-align: left;

    @media screen and (max-width: 768px) {
        
    }

    @media screen and (max-width: 468px) {
        font-size: 13px;
    }
`

export const ImageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    min-width: 35%;
    width: 35%;
    margin: 0 0;
    overflow: hidden;

    @media screen and (max-width: 768px) {
        
    }

    @media screen and (max-width: 468px) {

    }
`

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const ButtonWrapper = styled.div`
    width: 100%;
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start; 
    align-items: center;

    @media screen and (max-width: 768px) {
        
    }

    @media screen and (max-width: 468px) {
        
    }
`

export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({className}) => (className === 'remove' ? '#ff5656' : '#ADFFDE')};
    font-family: Inter;
    color: black;
    font-weight: bold;
    font-size: 15px;
    margin: 0 5px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    transition: 0.2s ease-in-out;
    letter-spacing: -0.8px;
    margin: 5px 5px;
    min-width: 20%;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;

    &:hover {
        background:#737373;
        color: white;
        transition: 0.2s ease-in-out;
    }

    &:active {
        transform: scale(0.9);
        box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
    }

    @media screen and (max-width: 768px) {
        
    }

    @media screen and (max-width: 468px) {
        font-size: 12px;
    }
`

export const Link = styled.a`
    color: white;
    text-decoration: none;
    cursor: pointer;
`


export const DisplayCardContainer = styled.div`
    height: 100%;
    border: 8px solid black;
    min-width: 400px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
    width: 100%;
    background: black;
    border-radius: 67px;
    box-shadow: 0px 0px 30px rgba(3, 3, 3, 0.396);
    cursor: pointer;
    overflow: hidden;
    margin: 20px 20px;
    transition: all 0.3s ease-in-out;

    @media screen and (max-width: 768px) {
        min-width: 350px;
        max-width: 350px;
    }

    @media screen and (max-width: 468px) {
        min-width: 250px;
        max-width: 250px;
    }

`

export const DisplayContentWrapper = styled.div`
    display: flex;
    height: 50%;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
    padding: 0 10px;

    @media screen and (max-width: 768px) {
        
    }

    @media screen and (max-width: 468px) {
        
    }
`

export const DisplayTextWrapper = styled.div`
    display: flex;
    height: auto;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    flex-flow: row wrap;
    padding-top: 10px;

    @media screen and (max-width: 768px) {
        width: 90%;
    }

    @media screen and (max-width: 468px) {
        width: 90%;
    }
`

export const DisplayTitle = styled.h1`
    margin: 0 0;
    font-family: Inter;
    letter-spacing: -2px;
    font-size: 25px;
    color: white;
    text-align: left;

    @media screen and (max-width: 768px) {
        font-size: 20px;
        letter-spacing: -1px;
    }

    @media screen and (max-width: 468px) {
        font-size: 15px;
        letter-spacing: -1px;
    }
`

export const DisplayText = styled.p`
    color: #737373;
    font-size: 20px;
    font-family: Inter;
    font-weight: 500;
    letter-spacing: -1px;
    margin: 0px 0;
    white-space: normal;
    text-align: left;

    @media screen and (max-width: 768px) {
        
    }

    @media screen and (max-width: 468px) {
        font-size: 12px;
    }
`

export const DisplayImageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40%;
    width: 100%;
    margin: 0 0;
    overflow: hidden;

    @media screen and (max-width: 768px) {
        
    }

    @media screen and (max-width: 468px) {
        
    }
`

export const DisplayImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const DisplayButtonWrapper = styled.div`
    width: 100%;
    height: 10%;
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: center; 
    align-items: center;

    @media screen and (max-width: 768px) {
        
    }

    @media screen and (max-width: 468px) {
        
    }
`

export const DisplayButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    font-family: Inter;
    color: black;
    font-weight: bold;
    font-size: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    transition: 0.2s ease-in-out;
    letter-spacing: -0.8px;
    margin: 0 5px;
    min-width: 20%;
    border: none;
    border-radius: 10px;
    padding: 5px 10px;

    &:hover {
        background:#737373;
        color: white;
        transition: 0.2s ease-in-out;
    }

    &:active {
        transform: scale(0.9);
        box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
    }

    @media screen and (max-width: 768px) {
        font-size: 15px;
    }

    @media screen and (max-width: 468px) {
        font-size: 12px;
    }
`

export const DisplayLink = styled.a`
    color: white;
    text-decoration: none;
    cursor: pointer;
`