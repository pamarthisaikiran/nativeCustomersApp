import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../CartContex";

const restaurantData = [
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

const RestaurantDetails = () => {
  const { id } = useParams();
  const restaurant = restaurantData.find((rest) => rest.id === parseInt(id));
  const { addToCart, updateCartQuantity } = useCart();
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, change) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[itemId] || 0) + change;
      if (newQuantity < 0) return prevQuantities;

      // Update or add item to cart based on quantity
      if (newQuantity === 0) {
        updateCartQuantity(itemId, 0);
        const { [itemId]: _, ...rest } = prevQuantities;
        return rest;
      } else if (change === 1 && newQuantity === 1) {
        addToCart(itemId, 1);
      } else {
        updateCartQuantity(itemId, newQuantity);
      }

      return {
        ...prevQuantities,
        [itemId]: newQuantity,
      };
    });
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <div>
      <h2>{restaurant ? restaurant.name : "Restaurant Not Found"} Menu</h2>
      {restaurant ? (
        <ul>
          {restaurant.menuItems.map((item) => {
            const quantity = quantities[item.id] || 0;
            return (
              <li key={item.id}>
                {item.name} - ₹{item.price}
                {quantity === 0 ? (
                  <button onClick={() => handleQuantityChange(item.id, 1)}>Add to Cart</button>
                ) : (
                  <div>
                    <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                    {quantity}
                    <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No menu available for this restaurant.</p>
      )}
      <button onClick={handleGoToCart}>Go to Cart</button>
    </div>
  );
};

export default RestaurantDetails;
