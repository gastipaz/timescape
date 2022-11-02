import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'
import {FaTimes} from 'react-icons/fa'

export const BackgroundOpacity = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: ${({isOpen}) => (isOpen ? '80' : '-10')};
    background: black;
    opacity: ${({isOpen}) => (isOpen ? '0.5' : '0')};
    transition: opacity 0.2s ease-in-out;
`;

export const SidebarContainer = styled.aside`
    position: fixed;
    z-index: 999;
    width: 50%;
    height: 100%;
    background: #0d0d0d;
    display: grid;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({isOpen}) => (isOpen ? '100%' : '0')};
    right: ${({isOpen}) => (isOpen ? '0' : '-100%')};
`;

export const CloseIcon = styled(FaTimes)`
    color: #fff;
`;

export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`;

export const SidebarWrapper = styled.div`
    color: #fff;
`;

export const SidebarMenu = styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 80px);
    text-align: center;

    @media screen and (max-width: 480px) {
        grid-template-rows: repeat(6, 60px);
    }
`;

export const SidebarLink = styled(Link)`
    display: flex;
    font-family: Inter;
    letter-spacing: -0.88px;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    text-decoration: none;
    list-style: none;
    transition: 0.2s ease-in-out;
    text-decoration: none;
    color: white;
    cursor: pointer;

    &:hover {
        color:gray;
        transition: 0.2s ease-in-out;
    }
`;

export const LogoutLink = styled.button`
    display: flex;
    background: transparent;
    border: none;
    font-family: Inter;
    letter-spacing: -0.88px;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    text-decoration: none;
    list-style: none;
    transition: 0.2s ease-in-out;
    text-decoration: none;
    color: white;
    cursor: pointer;

    &:hover {
        color:gray;
        transition: 0.2s ease-in-out;
    }
`