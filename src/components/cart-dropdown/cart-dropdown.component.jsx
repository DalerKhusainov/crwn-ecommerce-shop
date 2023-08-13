// REACT HOOKS
import { useContext } from "react";
// REACT ROUTER HOOKS
import { useNavigate } from "react-router-dom";
// CSS STYLES
import "./cart-dropdown.styles.scss";
// COMPONENTS
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
// FROM REACT CONTEXT API
import { CartContext } from "../../contexts/cart.context";

const CartDropdown = () => {
  // GETTING VALUE FROM CART CONTEXT API
  const { cartItems } = useContext(CartContext);
  // INITIALIZING NAVIGATE FUNCTION
  const navigate = useNavigate();

  // HANDLER FOR NAVIGATING TO CHECKOUT PAGE
  const goToCheckoutHandler = () => navigate("/checkout");

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
