import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ children, token }) {
  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
  // return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
