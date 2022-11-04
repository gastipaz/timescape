import React, {useEffect, useState} from 'react'
import {Nav, NavbarContainer, NavLogo, NavLink, MobileIcon, NavMenu, LogoutLink} from '../elements/NavbarElements'
import {FaBars} from 'react-icons/fa'
import { animateScroll as scroll } from 'react-scroll'
import { useLocation } from 'react-router-dom'

const Navbar = ({ toggle, logoutUser }) => {

    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = useLocation().pathname

    const toggleHome = ()=> {
        scroll.scrollToTop()
    }

    const changeNav = () => {
        if (window.scrollY > 60) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
        return () => {
            window.removeEventListener('scroll', changeNav);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

return (
    <div>
        <Nav pathname={pathname} isScrolled={isScrolled}>
            <NavbarContainer pathname={pathname}>
                <NavLogo onClick={toggleHome} pathname={pathname} className="logo" to="/">
                    Timescape
                </NavLogo>
                <MobileIcon onClick={toggle} pathname={pathname}>
                    <FaBars className='sidebarIcon'/>
                </MobileIcon>
                <NavMenu> 
                    <NavLink to="/search" pathname={pathname}>
                        Search
                    </NavLink>
                    <NavLink to="/planner" pathname={pathname}>
                        Planner
                    </NavLink>                
                    <LogoutLink onClick={()=>logoutUser()} pathname={pathname}>
                        Logout
                    </LogoutLink>
                </NavMenu>
            </NavbarContainer>
        </Nav>
    </div>
)
}

export default Navbar