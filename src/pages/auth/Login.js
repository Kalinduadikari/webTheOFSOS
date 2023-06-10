import React from "react";
import "./Login.scss";
import { Link, useNavigate  } from "react-router-dom";
import { loginUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { useState } from "react";
import { toast } from "react-toastify";
import logoImg from "../../assets/lgo.png"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email address");
    }

    setIsLoading(true);

    try {
      const data = await loginUser(formData);
      console.log("Response data: ", data);
  
      await dispatch(SET_LOGIN(true));
      console.log("Dispatching name: ", data.fishmonger.name); // Update this line
      await dispatch(SET_NAME(data.fishmonger.name));
      navigate("/dash");
  
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }

    console.log(formData);
  };

  return (
    <div className="login-page">
      <Link to="/" className="logo-link">
      <div style={{ backgroundColor: "#202023", paddingTop:"0px" }} className="logo">
        <img alt="logoimgs" src={logoImg} style={{width:"200px", height:"60px", marginLeft:"60px"}}/>
        </div>
      </Link>
      <div className="login-container">
        {isLoading && <Loader />}
        <div className="login-box">
          <h1 className="login-title">Login</h1>
          <form className="login-form" onSubmit={login}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
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
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <div style={{fontFamily:"-apple-system", fontWeight: 250}} className="register-link">
            <p style={{marginTop:"50px", fontFamily:"-apple-system", color: "#ededed"}}>
              Don't have an account? <Link style={{fontFamily: "-apple-system", color: "#8ddbe0"}} to="/register">Register</Link>
            </p>
          </div>
          <div className="forgot-password-link">
            <p style={{fontFamily:"-apple-system", fontWeight: 250, color: "#ededed"}}>
              Forgot your password? <Link style={{fontFamily: "-apple-system", color: "#8ddbe0"}} to="/forgot">Click here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
