import React, { Component } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style.css";
import {
  faAddressCard,
  faClipboard
} from "@fortawesome/free-regular-svg-icons";

const Sidebar = props => {
  return (
    <React.Fragment>
      <SideNav onToggle={props.handleToggle} onSelect={props.handleSelect}>
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">

          <NavItem eventKey="">
            <NavIcon>
              <FontAwesomeIcon icon={faClipboard} />
            </NavIcon>
            <NavText>Dashboard</NavText>
          </NavItem>

        </SideNav.Nav>
      </SideNav>
    </React.Fragment>
  );
};
export default Sidebar;
