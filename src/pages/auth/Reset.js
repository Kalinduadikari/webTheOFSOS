import React, { useState } from "react";
import "./Reset.scss";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../../services/authService";
import { toast } from "react-toastify";
import logoImg from "../../assets/lgo.png" // 

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetToken } = useParams();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await resetPassword(resetToken, password);
      toast.success("Password has been reset");
    } catch (error) {
      console.error("Error while resetting password", error);
    }
  };

  return (
    <div className="reset-page">
      <Link to="/" className="reset-logo-link">
        <div style={{ backgroundColor: "#202023", paddingTop:"0px" }} className="reset-logo">
          <img alt="logoimgs" src={logoImg} style={{width:"200px", height:"60px", marginLeft:"60px"}}/>
        </div>
      </Link>
      <div className="reset-container">
        <div className="reset-box">
          <h1 className="reset-title">Reset Password</h1>
          <p style={{color: "#ededed"}}>Please enter your new password.</p>
          <form className="reset-form" onSubmit={handleSubmit}>
            <div className="reset-form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="reset-form-group">
              <label htmlFor="confirm-password">Confirm New Password</label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            <button type="submit" className="reset-btn">
              Reset Password
            </button>
          </form>
          <div className="reset-login-link">
            <p style={{marginTop:"50px", fontFamily:"-apple-system", color: "#ededed", fontWeight: 250}}>
              Remember your password? <Link style={{fontFamily: "-apple-system", color: "#8ddbe0"}} to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
