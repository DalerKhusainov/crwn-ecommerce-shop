// REACT HOOKS
import { useContext } from "react";
// IMPORTING ICON
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
// CSS STYLES
import "./cart-icon.styles.scss";
// FROM REACT CONTEXT API
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  // GETTING VALUES AND FUNCS FROM CARTCONTEXT API
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  return (
    <div
      onClick={() => setIsCartOpen(!isCartOpen)}
      className="cart-icon-container"
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">10</span>
    </div>
  );
};

export default CartIcon;
