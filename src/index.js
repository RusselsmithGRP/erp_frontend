import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import configureStore from "./store/configureStore";
import "assets/scss/material-dashboard-pro-react.css?v=1.2.0";
import indexRoutes from "./routes/index.jsx";
import PrivateRoute from "./layouts/PrivateRoute.jsx";
import LoginPage from "./views/LoginPage/index.js";
import ForgotPassword from "./views/UserProfile/ForgotPassword.jsx";
import Confirm from "./views/UserProfile/Confirm.jsx";
import Resetpassword from "./views/UserProfile/Resetpassword.jsx";
import RegistrationPage from "./views/RegistrationPage/index.js";
import "./index.css";

const hist = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist} basename={`${process.env.PARENT_FOLDER}`}>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/resetpassword/:token" exact component={Resetpassword} />
        <Route path="/forgotpassword" exact component={ForgotPassword} />
        <Route path="/register" exact component={RegistrationPage} />
        <Route path="/confirm/:token" exact component={Confirm} />

        {indexRoutes.map((prop, key) => {
          return (
            <PrivateRoute
              path={prop.path}
              component={prop.component}
              key={key}
            />
          );
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("app")
);
