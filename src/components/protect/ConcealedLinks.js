import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';

const ProtectedLink = ({ children, showWhenLoggedIn }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn === showWhenLoggedIn) {
    return children;
  }
  return null;
};

export const ShowOnLogin = React.memo((props) => <ProtectedLink {...props} showWhenLoggedIn />);
export const ShowOnLogOut = React.memo((props) => <ProtectedLink {...props} showWhenLoggedIn={false} />);
 