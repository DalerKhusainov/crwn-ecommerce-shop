// REACT HOOKS
import { createContext, useState, useEffect } from "react";

///////////////////////////////////////////////////////////////////
// A HELPER FUNCTION FOR FINDING A CURRENT PRODUCT TO ADD TO THE CART
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
// A HELPER FUNCTION FOR FINDING A CURRENT PRODUCT TO REMOVE FROM THE CART
const removeCartItem = (cartItems, cartItemToRemove) => {
  // FIND THE cartItems TO REMOVE
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  // CHECK IF QUANTITY IS EQUAL TO 1, IF IT IS REMOVE THAT ITEM FROM THE CART
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  // RETURN BACK cartItems WITH MATCHING CART ITEM WITH REDUCED QUANTITY
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

///////////////////////////////////////////////////////////////////
// A HELPER FUNCTION FOR FINDING A CURRENT PRODUCT TO CLEAR FROM THE CART
export const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

///////////////////////////////////////////////////////////////////
// DEFINING WHAT WE EXPORT IN CURRENT CONTEXT
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItem: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  // STATE VALUE FOR OPENING & CLOSING CARTDROP MODEL
  const [isCartOpen, setIsCartOpen] = useState(false);
  // STATE VALUE FOR CART ITEMS
  const [cartItems, setCartItems] = useState([]);
  // STATE VALUE FOR AMOUNT OF ITEMS IN THE CART
  const [cartCount, setCartCount] = useState(0);
  // STATE VALUE FOR TOTAL AMOUNT OF ITEMS IN THE CART
  const [cartTotal, setCartTotal] = useState(0);

  ///////////////////////////////////////////////////////////////////
  // FUNC FOR ADDING A PRODUCT
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  ///////////////////////////////////////////////////////////////////
  // FUNC FOR REMOVING BY DECREMENTING AMOUNT OF A PRODUCT
  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  ///////////////////////////////////////////////////////////////////
  // FUNC FOR CLEARING A PRODUCT FROM THE CART
  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  ///////////////////////////////////////////////////////////////////
  // FUNC FOR SETTING AMOUNT OF ITEMS IN THE CART
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  ///////////////////////////////////////////////////////////////////
  // FUNC FOR SETTING TOTAL AMOUNT OF ITEMS IN THE CART
  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  // EXPORTING ALL VAUES AND FUNCS FROM CART CONTEXT
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
