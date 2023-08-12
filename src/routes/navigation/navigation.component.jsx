// REACT HOOKS
import { Fragment, useContext } from "react";
// REACT ROUTER HOOKS
import { Outlet, Link } from "react-router-dom";
// CSS STYLES
import "./navigation.styles.scss";
// FROM ASSETS
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
// FROM REACT CONTEXT API
import { UserContext } from "../../contexts/user.context";
// FROM FIREBASE UTILS
import { signOutUser } from "../../utils/firebase.utils";

const Navigation = () => {
  // GETTING VALUES AND FUNCS FROM USERCONTEXT API
  const { currentUser } = useContext(UserContext);

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
            <span className="nav-link">SIGN OUT</span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
