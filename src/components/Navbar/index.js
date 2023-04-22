
import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/MainPAge" activeStyle>
            דף ראשי
          </NavLink>
          <NavLink to="/BullBoard" activeStyle>
            לוח המודעות
          </NavLink>
          <NavLink to="/FarmerCreateUser" activeStyle>
            הצטרפו אלינו
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;