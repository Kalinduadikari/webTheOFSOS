import React, { useState } from "react";
import "./Forgot.scss";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, validateEmail } from "../../services/authService";
import { toast } from "react-toastify";
import logoImg from "../../assets/lgo.png"

const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email address");
    }

    try {
      await forgotPassword(email);
      toast.success("Password reset email has been sent");
      navigate("/login");
    } catch (error) {
      console.error("Error while sending password reset email", error);
    }
  };

  return (
    <div className="forgot-page">
      <Link to="/" className="forgot-logo-link">
        <div style={{ backgroundColor: "#202023", paddingTop:"0px" }} className="forgot-logo">
          <img alt="logoimgs" src={logoImg} style={{width:"200px", height:"60px", marginLeft:"60px"}}/>
        </div>
      </Link>
      <div className="forgot-container">
        <div className="forgot-box">
          <h1 className="forgot-title">Forgot Password</h1>
          <p style={{color: "#ededed"}}>Please enter your email address to reset your password.</p>
          <form className="forgot-form" onSubmit={handleSubmit}>
            <div className="forgot-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="forgot-btn">
              Send Reset Link
            </button>
          </form>
          <div className="forgot-login-link">
            <p style={{marginTop:"50px", fontFamily:"-apple-system", color: "#ededed", fontWeight: 250}}>
              Remember your password? <Link style={{fontFamily: "-apple-system", color: "#8ddbe0"}} to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
