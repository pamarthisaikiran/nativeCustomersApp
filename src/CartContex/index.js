import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

const restaurantData = [
  // Add the restaurant data with unique item IDs here (same as above)
  {
    id: 1,
    name: "Restaurant 1",
    menuItems: [
      { id: 1, name: "Dish 1A", price: 150 },
      { id: 2, name: "Dish 1B", price: 200 },
      { id: 3, name: "Dish 1C", price: 250 },
    ],
  },
  {
    id: 2,
    name: "Restaurant 2",
    menuItems: [
      { id: 1, name: "Dish 2A", price: 120 },
      { id: 2, name: "Dish 2B", price: 180 },
      { id: 3, name: "Dish 2C", price: 220 },
    ],
  },
  {
    id: 3,
    name: "Restaurant 3",
    menuItems: [
      { id: 1, name: "Dish 3A", price: 300 },
      { id: 2, name: "Dish 3B", price: 350 },
      { id: 3, name: "Dish 3C", price: 400 },
    ],
  },
  {
    id: 4,
    name: "Restaurant 4",
    menuItems: [
      { id: 1, name: "Dish 4A", price: 130 },
      { id: 2, name: "Dish 4B", price: 230 },
      { id: 3, name: "Dish 4C", price: 280 },
    ],
  },
  {
    id: 5,
    name: "Restaurant 5",
    menuItems: [
      { id: 1, name: "Dish 5A", price: 160 },
      { id: 2, name: "Dish 5B", price: 210 },
      { id: 3, name: "Dish 5C", price: 260 },
    ],
  },
];

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (itemId, quantity) => {
    const restaurantItem = restaurantData
      .flatMap(restaurant => restaurant.menuItems)
      .find(item => item.id === itemId);

    if (restaurantItem) {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === itemId);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          return [...prevItems, { ...restaurantItem, quantity }];
        }
      });
    }
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.id !== itemId);
      }
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
