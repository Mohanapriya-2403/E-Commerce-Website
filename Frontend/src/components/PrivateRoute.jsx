import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PrivateRoute Wrapper
 * Checks if a user is authenticated.
 * If true, it renders the "Outlet" (the intended page).
 * If false, it redirects to /login and remembers where the user was trying to go.
 */
const PrivateRoute = () => {
  const { userInfo } = useAuth();
  const location = useLocation();

  // If userInfo exists, the user is logged in
  return userInfo ? (
    <Outlet />
  ) : (
    // We pass the current location to 'state' so we can redirect 
    // the user back here after they successfully log in.
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;