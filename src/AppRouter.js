import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Detailed from './component/Detailed/Detailed';
import Login from "./component/Login/Login"
import AddingPage from "./component/AddingPage/AddingPage"
import Statistics from "./component/Statistics/Statistics"
import EditItem from './component/Statistics/statistics/EditItem';
import Register from './component/Login/Register';
import Myself from './component/Myself/Myself'

class AppRouter extends Component {
  
  componentDidMount() {
    

  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/detailed" exact component={Detailed}></Route>
          <Route path="/Statistics" exact component={Statistics}></Route>
          <Route path="/edititem/:id" exact component={EditItem}></Route>
          <Route path="/AddingPage" exact component={AddingPage}></Route>
          <Route path="/Login" component={Login}></Route>
          <Route path="/Myself" component={Myself}></Route>
          <Route exact path="/">
          {localStorage.getItem("username") ? <Redirect exact from="/" to="/Statistics" /> : <Login />}
          </Route>
          {/* {!localStorage.getItem("userName") && <Redirect to = "/Login"/>} */}
          
          
          <Route exact path = "/accountLogin">
            <Login />
          </Route>
          <Route exact path = "/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;