import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    // Get authentification state
    const { isAuthenticated, isLoading } = useAuth();
      if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }
// if is notc authetiticated, redirect to login page
if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
}
// if authenticated true, redirect to protected page
return<>{children}</>;
}
 export default ProtectedRoute;