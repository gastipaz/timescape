import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, BackgroundOpacity, LogoutLink } from '../elements/SidebarElements'

const Sidebar = ({isOpen, toggle, logoutUser}) => {
  return (
    <div>
      <BackgroundOpacity isOpen={isOpen} onClick={toggle}/>
      <SidebarContainer isOpen={isOpen} onClick={toggle}>
          <Icon onClick={toggle}>
              <CloseIcon/>
          </Icon>
          <SidebarWrapper>
              <SidebarMenu>
                  <SidebarLink to="/search" onClick={toggle}>
                    Search
                  </SidebarLink>
                  <SidebarLink to="/planner" onClick={toggle}>
                    Planner
                  </SidebarLink>
                  <LogoutLink onClick={()=>logoutUser()}>
                    Logout
                  </LogoutLink>
              </SidebarMenu>
          </SidebarWrapper>
      </SidebarContainer>
    </div>
  )
}

export default Sidebar