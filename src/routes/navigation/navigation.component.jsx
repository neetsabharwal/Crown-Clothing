import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import "./navigation.styles.scss";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/contact">
            CONTACT
          </Link>
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
            currentUser ? (<span onClick={signOutUser} className="nav-link">
            SIGN OUT
          </span>) : (<Link className="nav-link" to="/auth">
              SIGN IN
            </Link>)
          }
            <CartIcon></CartIcon>
          </div>
        { isCartOpen && <CartDropdown></CartDropdown> }
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
