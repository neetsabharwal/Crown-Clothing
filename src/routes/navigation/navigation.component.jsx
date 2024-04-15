import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from "./navigation.styles.jsx";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {/* {!currentUser && (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          {currentUser && (
            <Link className="nav-link" to="/logout">
              SIGN OUT
            </Link>
          )} */}
          {
            currentUser ? (<NavLink as='span' onClick={signOutUser}>
            SIGN OUT
          </NavLink>) : (<NavLink to="/auth">
              SIGN IN
            </NavLink>)
          }
            <CartIcon></CartIcon>
          </NavLinksContainer>
        { isCartOpen && <CartDropdown></CartDropdown> }
        </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
