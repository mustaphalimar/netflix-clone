import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Explore from "./components/Explore";
import { connect } from "react-redux";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { auth } from "./firebase";
import { SET_USER } from "./redux/actions";
import Serie from "./components/Serie";
import Movie from "./components/Movie";
import Profile from "./components/Profile";

function App({ user, setUser }) {
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      }
    });
  }, [user, setUser]);
  if (user) {
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <Explore />
          </Route>
          <Route path="/serie/:id">
            <Serie />
          </Route>
          <Route path="/movie/:id">
            <Movie />
          </Route>
          <Route path="/profile">
            <Profile user={user} />
          </Route>
        </Switch>
      </Router>
    );
  }
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch({ type: SET_USER, payload: { user: user } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
