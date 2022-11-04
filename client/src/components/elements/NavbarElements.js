import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'

export const Nav = styled.nav`
    position: fixed;
    width: 100%;
    background: transparent;
    top: 0;
    height: 60px;
    justify-content: center;
    align-items: center;
    z-index: 100;
    background:  ${({pathname}) => ((pathname === '/') ? 'rgba(0, 0, 0, 0.3)' : 'none')};
    transition: all 0.3s ease-in-out;

    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`

export const NavbarContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 60px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100;
    background: ${({pathname}) => ((pathname === '/search' || pathname === '/') ? '#000000ac' : 'none')};
    backdrop-filter: ${({pathname}) => ((pathname === '/search' || pathname === '/') ? 'blur(3px)' : 'none')};
    box-shadow: ${({pathname}) => ((pathname === '/search' || pathname === '/') ? '0 5px 20px rgba(0,0,0,0.35)' : 'none')};
`

export const NavLogo = styled(Link)`
    color: ${({pathname}) => ((pathname === '/search' || pathname === '/') ? 'white' : 'black')};
    text-decoration: none;
    justify-self: flex-start;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-left: 24px;
    width: fit-content;
    height: 60px;
    font-family: Inter;
    font-weight: bold;
    letter-spacing: -0.88px;
    transition: all 0.2s ease-in-out;

    &.active {
        color: ${({pathname}) => ((pathname === '/search' || pathname === '/') ? 'white' : 'black')};
        font-size: 25px;
        transition: all 0.2s ease-in-out;
    }
    
    &:hover {
        color: gray;
        transition: all 0.2s ease-in-out;
    }
`
export const NavMenu = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    width: fit-content;
    list-style: none;
    margin-left: auto;
    margin-right: 24px;

    @media screen and (max-width: 768px){
        display: none;
    }
`

export const NavLink = styled(Link)`
    color: ${({pathname}) => ((pathname === '/search' || pathname === '/') ? 'white' : 'black')};
    display: flex;
    font-family: Inter;
    font-weight: 600;
    font-size: 18px;
    letter-spacing: -0.88px;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 60px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &.active {
        color: ${({pathname}) => ((pathname === '/search' || pathname === '/') ? 'white' : 'black')};
        font-size: 25px;
        transition: all 0.2s ease-in-out;
    }
    
    &:hover {
        color: gray;
        transition: 0.2s ease-in-out;
    }
`
export const MobileIcon = styled.div`
    display: flex;
    display: none;
    align-items: center;
    width: fit-content;


    @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    right: 50px;
    top: -10px;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: ${({pathname}) => ((pathname === '/search' || pathname === '/') ? 'white' : 'black')};
    }

    &:hover {
        color: grey;
        }
`

export const LogoutLink = styled.button`
    background: transparent;
    border: none;
    color: ${({pathname}) => ((pathname === '/search' || pathname === '/') ? 'white' : 'black')};
    display: flex;
    font-family: Inter;
    font-weight: 600;
    font-size: 18px;
    letter-spacing: -0.88px;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 60px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &.active {
        color: ${({pathname}) => ((pathname === '/search' || pathname === '/') ? 'white' : 'black')};
        font-size: 25px;
        transition: all 0.2s ease-in-out;
    }
    
    &:hover {
        color: gray;
        transition: 0.2s ease-in-out;
    }
`