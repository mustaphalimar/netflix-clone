import React, { useEffect, useState } from "react";
import "./Profile.css";
import Header from "./Header";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import { auth, db } from "../firebase";

function Profile({ user }) {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [watchList, setWatchList] = useState([]);

  const updateUserInfo = (e) => {
    e.preventDefault();
    if (newUsername) {
      auth.currentUser
        .updateProfile({
          displayName: newUsername,
        })
        .then(() => alert("Username updated successfuly"));
    }
    if (newEmail) {
      auth.currentUser
        .updateEmail(newEmail)
        .then(() => alert("Email updated successfuly"));
    }
    if (newPassword) {
      auth.currentUser
        .updatePassword(newPassword)
        .then(() => alert("Password updated successfuly"));
    }
  };
  useEffect(() => {
    db.collection("favorites").onSnapshot((snapshot) => {
      setFavorites(
        snapshot.docs.map((doc) => {
          return { id: doc.id, favorite: doc.data() };
        })
      );
    });
    db.collection("watch_list").onSnapshot((snapshot) => {
      setWatchList(
        snapshot.docs.map((doc) => {
          return { id: doc.id, watchListItem: doc.data() };
        })
      );
    });
  }, []);

  const deleteFavorite = (item) => {
    db.collection("favorites")
      .doc(item)
      .delete()
      .then(() => alert("Item deleted Successfuly"));
  };

  const deleteWatchList = (item) => {
    db.collection("watch_list")
      .doc(item)
      .delete()
      .then(() => alert("Item deleted Successfuly"));
  };

  return (
    <>
      <Header />
      <main className="profile">
        <main className="profile__main">
          <div className="profile__userInfo">
            <div className="profile__avatarInfo">
              <Avatar
                className="profile__avatar"
                alt={user?.displayName?.toUpperCase()}
                src="/static/images/avatar/1.jpg"
              />

              <h1 className="profile__username">{user?.displayName}</h1>
              <h5 className="profile__username email">{user?.email}</h5>
            </div>
            <form onSubmit={updateUserInfo} className="profile__updateInfo">
              <h1 className="profile__favTitle">Update Info</h1>
              <p>(You don't have to change everything !) </p>
              <div className="profile__updateField">
                <input
                  type="text"
                  value={newUsername}
                  placeholder="Enter New Username"
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>
              <div className="profile__updateField">
                <input
                  type="email"
                  value={newEmail}
                  placeholder="Enter New Email"
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div className="profile__updateField">
                <input
                  type="password"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button className="profile__updateBtn" type="submit">
                Update Info
              </button>
            </form>
          </div>
          <div className="profile__favorite">
            <h1 className="profile__favTitle">My and User's Favorites : </h1>
            <div className="profile__favorites">
              {favorites.length === 0 ? (
                <p>
                  Your Have No items in your favorites ,please navigate to home
                  page and add some !{" "}
                </p>
              ) : (
                favorites.map((item) => {
                  return (
                    <div className="row__movie" key={item.id}>
                      <div
                        className={`row__poster row__posterLarge`}
                        style={{
                          backgroundImage: `url( ${item.favorite.posterImg})`,
                        }}
                      >
                        <button onClick={() => deleteFavorite(item.id)}>
                          <DeleteIcon className="row__posterDelete" />
                        </button>
                      </div>
                      <p className="row__title favTitle">
                        {item.favorite.title}{" "}
                        <span>({item.favorite.release_date})</span>
                      </p>
                      <p className="row__addedDate">
                        Added : {item.favorite.added_date}
                      </p>
                      <p className="row__addedDate">
                        By : {item.favorite.added_by}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="profile__favorite">
            <h1 className="profile__favTitle">My and User's WatchList : </h1>
            <div className="profile__favorites">
              {watchList.length === 0 ? (
                <p>
                  Your Have No items in your WatchList ,please navigate to home
                  page and add some !{" "}
                </p>
              ) : (
                watchList.map((item) => {
                  return (
                    <div className="row__movie" key={item.id}>
                      <div
                        className="row__poster row__posterLarge"
                        style={{
                          backgroundImage: `url( ${item.watchListItem.posterImg})`,
                        }}
                      >
                        <button onClick={() => deleteWatchList(item.id)}>
                          <DeleteIcon className="row__posterDelete" />
                        </button>
                      </div>
                      <p className="row__title favTitle">
                        {item.watchListItem.title}
                        <span>({item.watchListItem.release_date})</span>
                      </p>
                      <p className="row__addedDate">
                        Added :{item.watchListItem.added_date}
                      </p>
                      <p className="row__addedDate">
                        By : {item.watchListItem.added_by}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </main>
      </main>
    </>
  );
}

export default Profile;
