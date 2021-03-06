import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuth } from "../../utils/common/helpers";

const PrivateRoute: React.FunctionComponent<any> = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuth() ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default PrivateRoute;
