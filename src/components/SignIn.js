import React, { useEffect, useState } from "react";
import "./SignIn.css";
import { auth } from "../firebase";
import { connect } from "react-redux";
import { SET_USER } from "../redux/actions";
import { Link, useHistory } from "react-router-dom";

function SignIn({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault();
    if ((email, password)) {
      auth
        .signInWithEmailAndPassword(email, password)

        .catch((error) => alert(error.message));
      history.push("/");
      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      }
    });
  }, [user, setUser]);
  return (
    <div className="signin">
      <div className="signin__mainBox">
        <div className="signin__box">
          <h1>Sign In</h1>
          <form onSubmit={signIn}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign In</button>
          </form>
          <p>
            Don't have an account ? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch({ type: SET_USER, payload: { user } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
