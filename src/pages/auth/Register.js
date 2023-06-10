import React, { useState } from "react";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import logoImg from "../../assets/lgo.png"; // Add this line
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const initialState = {
  name: "",
  email: "",
  password: ""
}

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false) 
  const [formData, setFormData] = useState(initialState)
  const {name, email, password} = formData;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  const handleInputChange = (e) => { 
      const {name, value} = e.target;
      setFormData({ ...formData, [name]: value});
  };

  const register = async (e) => { 
    e.preventDefault();
  
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
  
    if (password.length < 6){
      return toast.error("Password must be at least 6 characters");
    }
  
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email address");
    }
  
    const userData = {
      name, email, password
    }
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.fishmonger.name));
      navigate("/dash");
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="login-page">
      <Link to="/" className="logo-link">
        <div style={{ backgroundColor: "#202023", paddingTop:"0px" }} className="logo">
          <img alt="logoimgs" src={logoImg} style={{width:"200px", height:"60px", marginLeft:"60px"}}/>
        </div>
      </Link>
      <div className="login-container">
        {isLoading && <Loader/>}
        <div className="login-box">
          <h1 className="login-title">Register</h1>
          <form className="login-form" onSubmit={register}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" id="name" required value={name} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required value={email} onChange={handleInputChange} />
          </div>
          <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-icon-wrapper">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="password-input"
                />
                <button 
                  type="button" 
                  className="icon-button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
            </div>
            <button type="submit" className="login-btn">Register</button>
          </form>
          <div style={{fontFamily:"-apple-system", fontWeight: 250}} className="register-link">
            <p style={{marginTop:"30px", fontFamily:"-apple-system", color: "#ededed"}}>
              Already have an account? <Link style={{fontFamily: "-apple-system", color: "#8ddbe0"}} to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;