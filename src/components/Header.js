import React, { useEffect, useState } from "react";
import "./Header.css";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

function Header({ user }) {
  const [show, handleShow] = useState(false);
  const signout = () => {
    auth.signOut();
    document.location = "/";
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <header
      className="header"
      style={{ backgroundColor: show ? "#111" : "transparent" }}
    >
      <Link to="/">
        <img
          className="header__logo"
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
      </Link>
      {user ? (
        <div className="header__buttons">
          <Button className="header__signout" onClick={signout}>
            Sign Out
          </Button>
          <Link to="/profile" className="header__link">
            <Avatar
              className="header__avatar"
              alt={user.displayName?.toUpperCase()}
              src="/static/images/avatar/1.jpg"
            />
          </Link>
          <Link to="/profile" className="header__link">
            <p>Logged in as :</p>{" "}
            <h3 className="header__username">{user.displayName}</h3>
          </Link>
        </div>
      ) : (
        <div className="header__buttons">
          <Button className="header__signout">
            <Link className="header__link" to="/signin">
              Sign In
            </Link>
          </Button>

          <Button className="header__signout">
            <Link className="header__link" to="/signup">
              Sign Up
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Header);
