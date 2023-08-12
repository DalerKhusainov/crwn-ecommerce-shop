// REACT HOOKS
import { Fragment, useContext, useState } from "react";
// REACT ROUTER HOOKS
import { Outlet, Link } from "react-router-dom";
// CSS STYLES
import "./navigation.styles.scss";
// FROM ASSETS
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
// FROM REACT CONTEXT API
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
// FROM FIREBASE UTILS
import { signOutUser } from "../../utils/firebase.utils";
// COMPONENTS
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

const Navigation = () => {
  // GETTING VALUES AND FUNCS FROM USERCONTEXT API
  const { currentUser } = useContext(UserContext);
  // GETTING VALUES AND FUNCS FROM CARTCONTEXT API
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="navigation">
        {/* LOGO */}
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        {/* NAV LINKS */}
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>

          {currentUser ? (
            <span onClick={signOutUser} className="nav-link">
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>

        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
