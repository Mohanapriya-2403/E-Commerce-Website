import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * AdminRoute Wrapper
 * Checks if the user is logged in AND is an admin.
 * If true, renders the child component (via <Outlet />).
 * If false, redirects to the login page.
 */
const AdminRoute = () => {
  const { userInfo } = useAuth();

  // If userInfo exists and the user is an admin, show the admin content
  // Otherwise, redirect to login
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  );
};

export default AdminRoute;