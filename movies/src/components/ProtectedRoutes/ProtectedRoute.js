import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ Component, loggedIn, ...props }) {

  return (

    <Route
      {...props}
      render={() => {
        return loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />

    /*   <Route>
        {() =>
          loggedIn ? <Component {...props} /> : <Redirect to="/" />
        }
      </Route> */
  )
}
export default ProtectedRoute;