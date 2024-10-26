/* import React from 'react';
import { useCart } from '../../CartContex';
import { db } from '../../firbase'; // Ensure Firebase is correctly configured
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Firestore functions

const Cart = () => {
  const { cartItems, updateCartQuantity } = useCart();

  const handleQuantityChange = (itemId, change) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity >= 0) { // Prevent negative quantities
        updateCartQuantity(itemId, newQuantity);
      }
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePayment = async () => {
    const totalAmount = getTotalPrice();
    if (totalAmount === 0) {
      alert("Your cart is empty!");
      return;
    }

    const options = {
      key: 'rzp_test_5P0Uqv0EhA1tfA', // Replace with your Razorpay key_id
      amount: totalAmount * 100, // Convert to paise (smallest currency unit)
      currency: 'INR',
      name: 'Your Store Name',
      description: 'Order Payment',
      handler: async (response) => {
        try {
          // Payment succeeded, save the order
          const isSaved = await saveOrder(response, totalAmount, "Payment Successful");
          if (isSaved) {
            alert(`Order placed successfully! Payment ID: ${response.razorpay_payment_id}`);
            // Optionally clear the cart after successful payment
            // clearCart(); 
          } else {
            alert('Failed to save order. Please try again.');
          }
        } catch (error) {
          console.error("Error handling payment success: ", error);
          alert('Failed to process payment. Please try again.');
        }
      },
      modal: {
        onDismiss: async () => {
          console.log('Payment modal closed');
        },
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#F37254',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
    
    // Listen for payment failure
    razorpay.on('payment.failed', async (response) => {
      try {
        const isSaved = await saveOrder(null, totalAmount, "Payment Failed");
        if (isSaved) {
          alert(`Payment failed. Reason: ${response.error.description}`);
        } else {
          alert('Failed to record failed order. Please try again.');
        }
      } catch (error) {
        console.error("Error handling payment failure: ", error);
        alert('Failed to record payment failure. Please try again.');
      }
    });
  };

  // Function to save order to Firestore
  const saveOrder = async (response, totalAmount, status) => {
    const orderDetails = {
      orderId: response ? response.razorpay_order_id : "N/A", // Include order ID if payment succeeded
      paymentId: response ? response.razorpay_payment_id : "N/A", // Include payment ID if available
      amount: totalAmount,
      items: cartItems,
      status, // 'Payment Successful' or 'Payment Failed'
      createdAt: serverTimestamp(), // Timestamp in Firestore
    };

    try {
      // Save order to Firestore
      await addDoc(collection(db, 'orders'), orderDetails);
      console.log("Order saved successfully: ", orderDetails); // Log for confirmation
      return true;
    } catch (error) {
      console.error("Error saving order: ", error);
      return false;
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ₹{item.price} x {item.quantity}
              <div>
                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ₹{getTotalPrice()}</h3>
      {cartItems.length > 0 && (
        <button onClick={handlePayment}>Pay Now</button>
      )}
    </div>
  );
};

export default Cart; */

import React from 'react';
import { useCart } from '../../CartContex';
import { db } from '../../firbase'; // Ensure Firebase is correctly configured
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Firestore functions
import { Checkout } from 'capacitor-razorpay';
import { Dialog } from '@capacitor/dialog';

const Cart = () => {
  const { cartItems, updateCartQuantity } = useCart();

  const handleQuantityChange = (itemId, change) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity >= 0) { // Prevent negative quantities
        updateCartQuantity(itemId, newQuantity);
      }
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePayment = async () => {
    const totalAmount = getTotalPrice();
    if (totalAmount === 0) {
      await presentAlert("Your cart is empty!");
      return;
    }

    const options = {
      key: 'rzp_test_5P0Uqv0EhA1tfA', // Replace with your Razorpay key_id
      amount: totalAmount * 100, // Convert to paise (smallest currency unit)
      currency: 'INR',
      name: 'Your Store Name',
      description: 'Order Payment',
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#F37254',
      },
    };

    try {
      const data = await Checkout.open(options);
      // Handle successful payment
      const isSaved = await saveOrder(data.response, totalAmount, "Payment Successful");
      if (isSaved) {
        await presentAlert(`Order placed successfully! Payment ID: ${data.response.razorpay_payment_id}`);
        // Optionally clear the cart after successful payment
        // clearCart(); 
      } else {
        await presentAlert('Failed to save order. Please try again.');
      }
    } catch (error) {
      const errorObj = JSON.parse(error['code']);
      await presentAlert(`Error: ${errorObj.description}`);
      // Optionally save the failed payment
      await saveOrder(null, totalAmount, "Payment Failed");
    }
  };

  // Function to save order to Firestore
  const saveOrder = async (response, totalAmount, status) => {
    const orderDetails = {
      orderId: response ? response.razorpay_order_id : "N/A", // Include order ID if payment succeeded
      paymentId: response ? response.razorpay_payment_id : "N/A", // Include payment ID if available
      amount: totalAmount,
      items: cartItems,
      status, // 'Payment Successful' or 'Payment Failed'
      createdAt: serverTimestamp(), // Timestamp in Firestore
    };

    try {
      // Save order to Firestore
      await addDoc(collection(db, 'orders'), orderDetails);
      console.log("Order saved successfully: ", orderDetails); // Log for confirmation
      return true;
    } catch (error) {
      console.error("Error saving order: ", error);
      return false;
    }
  };

  const presentAlert = async (message) => {
    await Dialog.alert({
      title: 'Payment Status',
      message: message,
    });
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ₹{item.price} x {item.quantity}
              <div>
                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ₹{getTotalPrice()}</h3>
      {cartItems.length > 0 && (
        <button onClick={handlePayment}>Pay Now</button>
      )}
    </div>
  );
};

export default Cart;
