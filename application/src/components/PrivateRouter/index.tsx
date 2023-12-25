import { useAuth } from "hooks/useAuth";
import { Navigate, Route, Routes } from "react-router-dom";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  path: string;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  path,
}) => {
  const { authToken } = useAuth();

  return (
    <Routes>
      <Route
        path={path}
        element={authToken ? <Component /> : <Navigate to="/signin" replace />}
      />
    </Routes>
  );
};
export default PrivateRoute;
