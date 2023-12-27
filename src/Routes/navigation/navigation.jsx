import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/utilis";
import Cart from "../../components/Cart/Cart";
import Cartdropdown from "../../components/Cart-dropdown/Cartdropdown";
import { UserContext } from "../../components/Context/UserContext";
import { CartContext } from "../../components/Context/CartContext";
import { ReactComponent as Crwnlogo } from '../../assets/crown.svg';
import './navigation.scss';

const Navigation = () => {

  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

    return (
      <Fragment>
        <div className="navigation">
          <Link className="logo-container" to='/'><div><Crwnlogo className="logo" /></div></Link>
          <div className="nav-links-container">
            <Link className="nav-link" to='/shop'>SHOP</Link>
            {
            currentUser ? (
                <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
              ) : (
                <Link className="nav-link" to='/auth'>SIGNIN</Link>
                )
            }
            <Cart />
          </div>
          {isCartOpen && <Cartdropdown />}
        </div>
        <Outlet />
      </Fragment>
    )
  }
  export default Navigation;