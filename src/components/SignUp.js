import React, { useState, useEffect } from "react";
import "./SignIn.css";
import { auth } from "../firebase";
import { connect } from "react-redux";
import { SET_USER } from "../redux/actions";
import { Link, useHistory } from "react-router-dom";

function SignUp({ setUser, user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();

  const signUp = (e) => {
    e.preventDefault();
    if (email && password && username) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          authUser.user.updateProfile({
            displayName: username,
          });
        })
        .catch((error) => alert(error.message));

      history.push("/");
      setEmail("");
      setPassword("");
      setUsername("");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        if (authUser.displayName) {
          // don't update profile
        } else {
          authUser.updateProfile({
            displayName: username,
          });
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [username, user, setUser]);
  return (
    <div className="signin">
      <div className="signin__mainBox">
        <div className="signin__box">
          <h1>Sign Up</h1>
          <form onSubmit={signUp}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Adress"
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
            Already have an account ? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch({ type: SET_USER, payload: { user } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
