import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firbase"; // Ensure this path is correct
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect to home page on successful login
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  const handlePasswordReset = async () => {
    setResetMessage(""); // Clear previous messages
    console.log("Reset email:", resetEmail); // Log the reset email for debugging

    try {
      // Directly send the password reset email without checking user existence
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Password reset email sent. Check your inbox.");
      setResetEmail(""); // Clear the input after sending
      setShowReset(false); // Close the dialog after sending email
    } catch (error) {
      // Handle errors, but do not check for user existence
      console.error("Error sending reset email:", error); // Log the error for debugging
      setResetMessage("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
      <p>
        <button
          onClick={() => setShowReset(true)}
          style={{ color: "blue", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}
        >
          Forgot Password?
        </button>
      </p>

      {showReset && (
        <div>
          <h3>Reset Password</h3>
          <input
            type="email"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
          />
          <button onClick={handlePasswordReset}>Reset Password</button>
          <button onClick={() => setShowReset(false)}>Cancel</button>
          {resetMessage && <p>{resetMessage}</p>} {/* Show the reset message here */}
        </div>
      )}
    </div>
  );
};

export default Login;
