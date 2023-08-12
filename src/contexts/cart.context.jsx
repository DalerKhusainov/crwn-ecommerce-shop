// REACT HOOKS
import { createContext, useState, useEffect } from "react";

///////////////////////////////////////////////////////////////////
// A HELPER FUNCTION FOR FINDING A CURRENT PRODUCT
const addCartItem = (cartItems, productToAdd) => {
  // FIND IF cartItems CONTAINS productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // IF FOUND, INCREMENT QUANTITY
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // RETURN NEW ARRAY WITH MODIFIED cartItems / NEW cartItems
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

///////////////////////////////////////////////////////////////////
// DEFINING WHAT WE EXPORT IN CURRENT CONTEXT
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItem: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  // STATE VALUE FOR OPENING & CLOSING CARTDROP MODEL
  const [isCartOpen, setIsCartOpen] = useState(false);
  // STATE VALUE FOR CART ITEMS
  const [cartItems, setCartItems] = useState([]);
  // STATE VALUE FOR AMOUNT ITEMS IN THE CART
  const [cartCount, setCartCount] = useState(0);

  ///////////////////////////////////////////////////////////////////
  // FUNC FOR ADDING A PRODUCT
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  ///////////////////////////////////////////////////////////////////
  // FUNC FOR ADDING A PRODUCT
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  // EXPORTING ALL VAUES AND FUNCS FROM CART CONTEXT
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
