// REACT HOOKS
import { useContext } from "react";
// PRODUCT CARD
import "./product-card.styles.scss";
// COMPONENTS
import Button from "../button/button.component";
// FROM REACT CONTEXT API
import { CartContext } from "../../contexts/cart.context";

const ProductCard = ({ product }) => {
  // DESTRUCTURING PRODUCT
  const { imageUrl, price, name } = product;

  // GETTING VALUE AND FUNCS FROM CART CONTEXT API
  const { addItemToCart } = useContext(CartContext);

  // LOCALE FUNC FOR ADDING A PRODUCT TO A CART
  const addProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
