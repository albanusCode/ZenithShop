import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/utilis";
import Cart from "../../components/Cart/Cart";
import Cartdropdown from "../../components/Cart-dropdown/Cartdropdown";
import { UserContext } from "../../components/Context/UserContext";
import { CartContext } from "../../components/Context/CartContext";
import { ReactComponent as Crwnlogo } from '../../assets/crown.svg';
import { NavigationContainer, NavLink, NavLinks, LogoContainer } from "./navigation-styles";

const Navigation = () => {

  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'><div><Crwnlogo className="logo" /></div></LogoContainer>
          <NavLinks className="nav-links-container">
            <Link className="nav-link" to='/shop'>SHOP</Link>
            {
            currentUser ? (
                <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
              ) : (
                <NavLink to='/auth'>SIGNIN</NavLink>
                )
            }
            <Cart />
          </NavLinks>
          {isCartOpen && <Cartdropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }
  export default Navigation;