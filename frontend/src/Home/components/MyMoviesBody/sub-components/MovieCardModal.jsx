import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

import { notify, types } from "../../../../shared/utils/notification";

import classes from "./css/MovieCardModal.module.css";

const MovieCardModal = ({ handleCloseSearchFriends }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isFriendsModal, setIsFriendsModal] = useState(true);
  // const navigate = useNavigate();

  // navigate("/movie/movieID")
  const dummyFriends = useMemo(
    () => [
      { username: "FriendUser1", avatarUrl: "https://placekitten.com/100/100" },
      { username: "FriendUser2", avatarUrl: "https://placekitten.com/100/100" },
      { username: "FriendUser3", avatarUrl: "https://placekitten.com/100/100" },
      { username: "FriendUser4", avatarUrl: "https://placekitten.com/100/100" },
      { username: "FriendUser5", avatarUrl: "https://placekitten.com/100/100" },
    ],
    []
  );
  const dummyStrangers = useMemo(
    () => [
      {
        username: "StrangerUser1",
        avatarUrl: "https://placekitten.com/100/100",
      },
      {
        username: "StrangerUser2",
        avatarUrl: "https://placekitten.com/100/100",
      },
      {
        username: "StrangerUser3",
        avatarUrl: "https://placekitten.com/100/100",
      },
      {
        username: "StrangerUser4",
        avatarUrl: "https://placekitten.com/100/100",
      },
      {
        username: "StrangerUser5",
        avatarUrl: "https://placekitten.com/100/100",
      },
    ],
    []
  );

  useEffect(() => {
    const updateScreenSize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", updateScreenSize);
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);
  const [users, setUsers] = useState(dummyFriends);
  const [isLoading, setIsloading] = useState(false);
  const [clickedUser, setClickedUser] = useState("");
  const [pendingUsers, setPendingUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);

  useEffect(() => {
    if (!isFriendsModal) setUsers(dummyStrangers);
    else if (isFriendsModal) setUsers(dummyFriends);
  }, [isFriendsModal, dummyStrangers, dummyFriends]);

  const sendInviteHandler = async (username) => {
    setClickedUser(username);
    setPendingUsers((prevVal) => {
      if (prevVal.find((u) => u === username)) return [...prevVal];
      return [...prevVal, username];
    });

    try {
      //send request
      setIsloading(true);
      setTimeout(() => {
        setIsloading(false);
        notify(types.SUCCESS, `Successfully invitation sent to ${username}`);
      }, 3000);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const cancelInvitationHandler = async (username) => {
    setClickedUser(username);

    try {
      // sendrequest
      setIsloading(true);
      setTimeout(() => {
        setPendingUsers((prevVal) => {
          if (!prevVal.find((u) => u === username)) return [...prevVal];
          notify(types.INFO, `Invitation withdrawn from ${username}`);
          return prevVal.filter((u) => u !== username);
        });
        setIsloading(false);
      }, 3000);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const username = "StrangerUser3";
  const userApproveHandler = () => {
    setPendingUsers((prevVal) => {
      if (!prevVal.find((u) => u === username)) return [...prevVal];
      return prevVal.filter((u) => u !== username);
    });
    setInvitedUsers((prevVal) => {
      if (prevVal.find((u) => u === username)) return [...prevVal];
      if (!pendingUsers.find((u) => u === username)) return [...prevVal];
      notify(types.INFO, `${username} Joined the party`);
      return [...prevVal, username];
    });
  };

  const userDeclineHandler = () => {
    setPendingUsers((prevVal) => {
      if (!prevVal.find((u) => u === username)) return [...prevVal];
      notify(types.INFO, `${username} Declined the invitation`);
      return prevVal.filter((u) => u !== username);
    });
  };

  const userLeftHandler = () => {
    setInvitedUsers((prevVal) => {
      if (!prevVal.find((u) => u === username)) return [...prevVal];
      notify(types.INFO, `${username} left the party`);
      return prevVal.filter((u) => u !== username);
    });
  };

  const invitationSentChecker = (username) =>
    pendingUsers.find((u) => u === username);
  const invitationAcceptChecker = (username) =>
    invitedUsers.find((u) => u === username);

  return (
    <div className={classes.modalContainer}>
      {screenWidth > 400 && (
        <>
          <Typography
            variant={screenWidth < 519 ? "h5" : "h4"}
            gutterBottom
            style={{
              fontSize: screenWidth < 519 ? "1.5rem" : "2rem",
              color: "white",
              fontWeight: "bold",
              fontFamily: "Comic Sans MS, cursive, sans-serif",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            {isFriendsModal
              ? "Hey there, solo superstars! 🌟 Craving some company to watch with?"
              : "Scout for Online Pals! 🌐🕵️‍♂️"}
          </Typography>
          <Typography
            variant={screenWidth < 650 ? "h5" : "h4"}
            component="p"
            textAlign="center"
            gutterBottom
            style={{
              fontSize: screenWidth < 650 ? "1.5rem" : "2rem",
              color: "grey",
              fontStyle: "italic",
              fontFamily: "Courier New, monospace",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            {isFriendsModal ? "Let's enjoy " : "Ready to dive into "}
            <span style={{ color: "#8fbed4" }}>{"movieName"}</span> together,
            {isFriendsModal
              ? "like one big happy movie club! 🎬🍿"
              : " with a bunch of online amigos? 🎬🌟"}
          </Typography>
        </>
      )}
      {invitedUsers.length !== 0 && (
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          alignItems="left"
        >
          <Link to={"#"} style={{ textDecoration: "none", color: "white" }}>
            Click here to watch with {invitedUsers.map((user) => `${user}, `)}
          </Link>
        </Typography>
      )}
      {isFriendsModal && (
        <Typography
          variant={screenWidth < 650 ? "h6" : "h5"}
          component="p"
          gutterBottom
          alignItems="left"
        >
          Online Buddies
        </Typography>
      )}

      {/* <button onClick={userApproveHandler}>approve</button>
      <button onClick={userDeclineHandler}>decline</button>
      <button onClick={userLeftHandler}>leave</button> */}

      <div className={classes.modalUsers}>
        {users.map((user, index) => (
          <Box key={index} className={classes.userBox}>
            <div className={classes.avatarContainer}>
              <Avatar alt={user.username} src={user.avatarUrl} />
            </div>
            <Typography variant="h5" component="p" gutterBottom>
              {user.username}
            </Typography>
            {invitationAcceptChecker(user.username) ? (
              <Typography variant="h6" component="p" ml="auto">
                User Arrived! 🎉
              </Typography>
            ) : (
              <>
                <Button
                  variant="contained"
                  size={screenWidth < 519 ? "small" : "medium"}
                  color="secondary"
                  style={{ color: "white" }}
                  onClick={() => sendInviteHandler(user.username)}
                  disabled={
                    invitationSentChecker(user.username) || isLoading
                      ? true
                      : false
                  }
                >
                  {isLoading && clickedUser === user.username ? (
                    <CircularProgress />
                  ) : invitationSentChecker(user.username) ? (
                    "Waiting approval"
                  ) : (
                    `Invite ${screenWidth < 519 ? "" : "to watch"}`
                  )}
                </Button>
                {invitationSentChecker(user.username) && !isLoading && (
                  <Button
                    variant="outlined"
                    style={{ marginLeft: "7px" }}
                    onClick={() => cancelInvitationHandler(user.username)}
                  >
                    Cancel
                  </Button>
                )}
              </>
            )}
          </Box>
        ))}
      </div>
      <Typography
        variant={screenWidth < 650 ? "h6" : "h5"}
        component="p"
        gutterBottom
      >
        {isFriendsModal
          ? "No buddies? No worries, my cool cat! "
          : "Bored of movie nights with mystery folks? "}
        <span
          className={classes.link}
          onClick={() => setIsFriendsModal((prevVal) => !prevVal)}
        >
          {isFriendsModal
            ? "Let's party with online amigos! 😎🎉"
            : "Spice it up with Movie Buddies! 🍿😄"}
        </span>
      </Typography>
      {screenWidth <= 400 && (
        <Button onClick={handleCloseSearchFriends} size="small">
          Close
        </Button>
      )}
    </div>
  );
};

export default MovieCardModal;
