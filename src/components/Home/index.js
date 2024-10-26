// Home.js
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firbase";

const Home = () => {
  const navigate = useNavigate();

  // Sample restaurant data with different dishes
  const restaurants = [
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

  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login"); // Redirect to login if not logged in
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login"); // Redirect to login after logging out
  };

  return (
    <div>
      <h2>Welcome to the Home Page!</h2>
      <p>You are logged in.</p>
      <button onClick={handleLogout}>Logout</button>

      <h3>Restaurants</h3>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <Link to={`/restaurant/${restaurant.id}`}>{restaurant.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
