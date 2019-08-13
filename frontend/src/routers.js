import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import * as Pages from "./pages";

const Routers = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Pages.HomePage} />
      <Route exact path="/employees" component={Pages.EmployeesListPage} />
      {/*<Route exact path="/employees/save" component={Pages.EmployeeAddPage} />
      <Route exact path="/employees/:id" component={Pages.EmployeeDetailPage} />
      <Route path="/employees/save/:id" component={Pages.EmployeeUpdatePage} /> */}
      />
      <Route component={Pages.NoMatchPage} />
    </Switch>
  </Router>
);

export default Routers;
