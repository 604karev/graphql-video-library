import { Auth } from "pages";
import { Routes, Route } from "react-router-dom";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
    </Routes>
  );
}

export default AuthRoutes;
