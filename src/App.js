// App.js
/*import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firbase"; // Make sure Firebase is set up in this file
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home"; // Home page component
import Loading from "./components/Loading"; // Loading spinner component
import RestaurantDetails from "./components/RestaurantDeatils"; // Correct spelling
import Cart from "./components/Cart"; // Ensure this is exported correctly
import { CartProvider } from "./CartContex"; // Import the CartProvider

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once auth check is complete
    });
    return () => unsubscribe(); // Clean up on unmount
  }, []);

  if (loading) {
    return <Loading />; // Show loading spinner while checking auth state
  }

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/home" /> : <SignUp />} />
          <Route path="/home" element={<ProtectedRoute user={user}><Home /></ProtectedRoute>} />
          <Route path="/restaurant/:id" element={<ProtectedRoute user={user}><RestaurantDetails /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute user={user}><Cart /></ProtectedRoute>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/login" />;
}

export default App; */

// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { auth } from "./firbase"; // Ensure this points to your Firebase setup
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Loading from "./components/Loading";
import RestaurantDetails from "./components/RestaurantDeatils"; // Correct spelling
import Cart from "./components/Cart";
import { CartProvider } from "./CartContex"; // Correct import
import { App as CapacitorApp } from '@capacitor/app'; // Import App from Capacitor
import { Capacitor } from '@capacitor/core';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once auth check is complete
    });
    return () => unsubscribe(); // Clean up on unmount
  }, []);

  useEffect(() => {
    const backButtonListener = () => {
      console.log(window.location.pathname)
      const isHomeScreen = window.location.pathname === "/home"
      if (!isHomeScreen && window.history.state && window.history.state.idx > 0) {
        console.log("Going back in history");
        window.history.back(); // Go back in history
      } else {
        // CapacitorApp.exitApp(); // Exit the app if no history
        console.log("Exiting app");
        CapacitorApp.exitApp(); 
      }
    };

    // Subscribe to the back button event
    const backButtonSubscription = CapacitorApp.addListener('backButton', backButtonListener);

    // Clean up listener on unmount
    return () => {
      // backButtonSubscription.remove() 
        
    };
  }, []);   

   
  
  

  
  if (loading) {
    return <Loading />; // Show loading spinner while checking auth state
  }

  return (
    <CartProvider> {/* Wrap your app in the CartProvider */}
      <Router>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/home" /> : <SignUp />} />
          <Route path="/home" element={<ProtectedRoute user={user}><Home /></ProtectedRoute>} />
          <Route path="/restaurant/:id" element={<ProtectedRoute user={user}><RestaurantDetails /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute user={user}><Cart /></ProtectedRoute>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/login" />;
}

export default App;
