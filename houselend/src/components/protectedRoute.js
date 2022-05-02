import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const userToken = sessionStorage.getItem("token");
  const myToken = JSON.parse(userToken);
  const isAuthenticated = myToken?.token
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/Login" />
      }
    />
  );
}

export default ProtectedRoute;