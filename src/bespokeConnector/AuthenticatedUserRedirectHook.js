import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkAuthentication } from '../services/authService';
import { SET_LOGIN } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const AuthenticatedUserRedirectHook = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectNonAuthUser = async () => {
      console.log('Checking authentication...'); // Add this line
      const isLoggedIn = await checkAuthentication();
      dispatch(SET_LOGIN(isLoggedIn));
      if (!isLoggedIn) {
        toast.info('Session has been expired, please login again.');
        navigate(path);
        return;
      }
    };
    redirectNonAuthUser();
  }, [navigate, path, dispatch]);
};

export default AuthenticatedUserRedirectHook;
