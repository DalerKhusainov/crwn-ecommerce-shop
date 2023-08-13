// REACT HOOKS
import { useContext } from "react";
// CSS STYLES
import "./checkout-item.styles.scss";
// FROM REACT CONTEXT API
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  // DESTRUCTURING THE CART ITEM
  const { name, imageUrl, price, quantity } = cartItem;
  // GETTING FUNC FROM CART CONTEXT API
  const { clearItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);

  // HANDLER FOR CREARING A ITEM FROM THE CART
  const clearItemHandler = () => clearItemFromCart(cartItem);
  // HANDLER FOR ADDING A ITEM TO THE CART
  const addItemHandler = () => addItemToCart(cartItem);
  // HANDLER FOR REMOVING A ITEM QUANTITY FROM THE CART
  const removeItemHandler = () => removeItemFromCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <span onClick={clearItemHandler} className="remove-button">
        &#10005;
      </span>
    </div>
  );
};

export default CheckoutItem;
