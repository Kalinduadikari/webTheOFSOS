import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  selectIsLoggedIn, 
  selectName, 
  SET_LOGIN, 
  SET_NAME, 
} from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../services/authService";
import "./Header.scss";


const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser({
      onSuccess: () => {
        dispatch(SET_LOGIN(false));
        dispatch(SET_NAME(""));
        navigate("/login");

      },

      onError: (error) => {
        console.error("Logout failed", error);
        // Show an error message to the user
      },
    });
  };

  return (
    <div className="header">
      <div className="flex">
        {isLoggedIn && (
          <h3>
            <span style={{color: "#ededed"}} className="wel">Welcome, </span>
            <span style={{color: "#ededed"}}  className="welone">{userName}, </span>
          </h3>
        )}
      </div>
      {isLoggedIn && (
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
