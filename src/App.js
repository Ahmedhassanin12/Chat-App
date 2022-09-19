import React from "react";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
// import { AuthContextProvider } from "./Context/UserContext";
import { UserAuth } from "./Context/UserContext";
import "./App.scss";

import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  const { user } = UserAuth();

  const PrivateRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children
  };

  return (
   
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
   
  );
}

export default App;
