import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
// import { FcAddImage } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">AHMED CHAT</span>
        <span className="title">Log In</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button>Log In</button>
          {error && <p>Something went wrong</p>}
        </form>
        <p>
          You do not have account ? <Link to="/register">Register</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
