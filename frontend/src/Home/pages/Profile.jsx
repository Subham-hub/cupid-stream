import { useDispatch, useSelector } from "react-redux";

import classes from "./Profile.module.css";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Input, LoadingSpinner, Modal } from "../../shared/UIElements";
import { useEffect, useState } from "react";
import ImageUploader from "../../shared/UIElements/ImageUploader/ImageUploader";
import { useForm } from "react-hook-form";
import { useHttp } from "../../shared/hooks/http-hook";
import { notify, types } from "../../shared/utils/notification";
import { updateData } from "../../shared/store/userDataSlice";
import truncateChars from "../../shared/utils/truncateChars";

const Profile = () => {
  const { username, email, createdAt, avatar } = useSelector((s) => s.userData);
  const [openPicUpdateModal, setOpenPicUpdateModal] = useState(false);
  const [newProfile, setNewProfile] = useState(null);
  const [forServerPic, setForServerPic] = useState(null);
  const dispatch = useDispatch();

  const openPicUpdateModalHandler = () => setOpenPicUpdateModal(true);
  const closePicUpdateModalHandler = () => {
    if (newProfile) setNewProfile(null);
    setOpenPicUpdateModal(false);
  };

  const {
    bgColor: { primaryBG, secondaryBG, primaryBtnBG, secondaryBtnBG },
    textColor: { primaryText, secondaryText },
  } = useSelector((s) => s.themeSlice);
  const { token, uid } = useSelector((s) => s.userData);
  const [activeTab, setActiveTab] = useState("editProfile");
  const handleTabChange = (tab) => setActiveTab(tab);
  const { register, handleSubmit, resetField } = useForm();
  const { sendRequest, isLoading, error, clearError } = useHttp();

  const formattedCreatedAt = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const editControlsInitalState = {
    username: false,
    email: false,
    btnState: true,
  };
  const [editUserDetails, setEditUserDetails] = useState(
    editControlsInitalState
  );

  const detailsUpdateHandler = async ({ newEmail, newUsername }) => {
    const field = {
      isEmail: editUserDetails.email,
      isUsername: editUserDetails.username,
    };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (field.isEmail && (!newEmail || !emailRegex.test(newEmail)))
      return notify(types.ERROR, "Please provide a valid email");

    if (field.isUsername && !newUsername)
      return notify(types.ERROR, "Please provide username");

    try {
      await sendRequest(
        "update_user_details",
        "PATCH",
        { uid, field, newEmail, newUsername },
        token
      );
      if (field.isUsername) {
        resetField("newUsername");
        dispatch(updateData({ field: "username", newData: newUsername }));
      }
      if (field.isEmail) {
        resetField("newEmail");
        dispatch(updateData({ field: "email", newData: newEmail }));
      }
      setEditUserDetails(editControlsInitalState);
      notify(types.SUCCESS, "Successfully updated");
    } catch (e) {
      console.error(e);
    }
  };

  const avatarUpdateHandler = async (type) => {
    const action = { update: type === "update", remove: type === "remove" };
    const formData = new FormData();
    formData.append("uid", uid);
    formData.append("action", JSON.stringify(action));
    formData.append("avatar", forServerPic);
    try {
      const { avatar } = await sendRequest(
        "update_user_avatar",
        "PATCH",
        formData,
        token
      );
      dispatch(updateData({ field: "avatar", newData: avatar }));
      setNewProfile(null);
      setForServerPic(null);
      notify(types.SUCCESS, "Successfully updated!");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!error) return;
    notify(types.ERROR, error);
    clearError();
  }, [error, clearError]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "editProfile":
        return (
          <Container sx={{ display: { md: "flex" } }} maxWidth="xl">
            <Paper
              elevation={3}
              sx={{
                mt: 1,
                mb: 1,
                p: 2,
                mr: 2,
                bgcolor: secondaryBG,
                color: primaryText,
              }}
            >
              <Box display="flex" alignItems="center">
                <Typography variant="h4">
                  @{truncateChars(username, 4)}|
                </Typography>
                <Typography variant="h6">{truncateChars(email, 40)}</Typography>
                <Typography variant="body1" ml="auto">
                  Joined on {formattedCreatedAt}
                </Typography>
              </Box>
              <hr />
              <form
                onSubmit={handleSubmit(detailsUpdateHandler)}
                autoComplete="off"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      checked={editUserDetails.username}
                      onChange={(e) =>
                        setEditUserDetails((prevVal) => ({
                          username: e.target.checked,
                          email: prevVal.email,
                          btnState: !editUserDetails.email && !prevVal.btnState,
                        }))
                      }
                    />
                  }
                  label="Update Username"
                />
                <Input
                  name="newUsername"
                  register={register}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="username"
                  label="Username"
                  autoComplete="username"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      checked={editUserDetails.email}
                      onChange={(e) =>
                        setEditUserDetails((prevVal) => ({
                          username: prevVal.username,
                          email: e.target.checked,
                          btnState:
                            !editUserDetails.username && !prevVal.btnState,
                        }))
                      }
                    />
                  }
                  label="Update Email"
                />
                <Input
                  name="newEmail"
                  register={register}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                />
                <Button
                  disabled={editUserDetails.btnState || isLoading}
                  style={{ backgroundColor: primaryBtnBG }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  {isLoading ? <CircularProgress /> : "Save Changes"}
                </Button>
              </form>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                mt: 1,
                mb: 1,
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: secondaryBG,
                color: primaryText,
              }}
            >
              <Typography variant="h4" gutterBottom>
                Profile Picture
              </Typography>
              <Avatar
                alt="User Avatar"
                src={newProfile ? newProfile : avatar && avatar.src}
                style={{
                  width: "120px",
                  height: "120px",
                  marginBottom: "16px",
                }}
              />
              {!newProfile && (
                <Box mt={1}>
                  <Button
                    style={{ backgroundColor: primaryBtnBG }}
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={openPicUpdateModalHandler}
                  >
                    Change
                  </Button>
                  <Button
                    style={{ backgroundColor: secondaryBtnBG }}
                    variant="contained"
                    onClick={() => avatarUpdateHandler("remove")}
                  >
                    Remove
                  </Button>
                </Box>
              )}
              {newProfile && (
                <Box>
                  <Button
                    style={{ backgroundColor: primaryBtnBG }}
                    variant="contained"
                    sx={{ mt: 1, mr: 1 }}
                    onClick={() => avatarUpdateHandler("update")}
                  >
                    Confirm
                  </Button>
                  <Button
                    style={{ backgroundColor: secondaryBtnBG }}
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={() => {
                      setNewProfile(null);
                      setForServerPic(null);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Paper>
          </Container>
        );
      case "resetPassword":
        return (
          <Paper sx={{ bgcolor: secondaryBG, color: primaryText }}>
            <form style={{ padding: "2rem" }}>
              <Input
                variant="outlined"
                margin="normal"
                fullWidth
                label="Old Password"
                type="password"
                id="old-password"
                autoComplete="new-password"
              />
              <Input
                variant="outlined"
                margin="normal"
                fullWidth
                label="New Password"
                type="password"
                id="new-password"
                autoComplete="new-password"
              />
              <Button
                style={{ backgroundColor: primaryBtnBG }}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
              >
                Reset Password
              </Button>
            </form>
          </Paper>
        );
    }
  };

  return (
    <>
      <Modal open={openPicUpdateModal} handleClose={closePicUpdateModalHandler}>
        <ImageUploader
          onImageUpload={(displayPic, serverPic) => {
            setNewProfile(displayPic);
            setForServerPic(serverPic);
            closePicUpdateModalHandler();
          }}
        />
      </Modal>
      <Box bgcolor={primaryBG}>
        <Container
          className={classes.content}
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {isLoading && <LoadingSpinner asOverlay />}
          {!isLoading && (
            <>
              <Typography variant="h3" color={secondaryText}>
                Update {activeTab === "editProfile" ? "Profile" : "Password"}
              </Typography>
              {!isLoading && (
                <Box
                  style={{
                    display: "flex",
                  }}
                  sx={{ minHeight: "20rem" }}
                >
                  <Tabs
                    textColor="inherit"
                    orientation="vertical"
                    variant="scrollable"
                    value={activeTab}
                    onChange={(event, newValue) => handleTabChange(newValue)}
                  >
                    <Tab label="Profile" value="editProfile" />
                    <Tab label="Password" value="resetPassword" />
                  </Tabs>
                  <Box style={{ flex: 1, overflow: "auto" }}>
                    {renderTabContent(activeTab)}
                  </Box>
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Profile;
