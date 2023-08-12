import { useSelector } from "react-redux";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";

import classes from "./History.module.css";
import Modal from "../../shared/UIElements/Modal/Modal";
import { useState } from "react";

const dummy = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

const History = ({ sendRequest }) => {
  const { bgColors, colors, borderColors, iconColors } = useSelector(
    (s) => s.uiSlice
  );
  const [openMemoriesModal, setOpenMemoriesModal] = useState(false);
  const handleOpenMemoriesModal = () => setOpenMemoriesModal(true);
  const handleCloseMemoriesModal = () => setOpenMemoriesModal(false);

  return (
    <>
      <Modal
        open={openMemoriesModal}
        handleClose={handleCloseMemoriesModal}
        bgcolor={bgColors.historyModalBg}
        color={colors.historyModalColor}
        border={borderColors.historyModalBorder}
        borderRadius={8}
        opacity={0.8}
      >
        <div style={{ textAlign: "center" }}>
          <Typography
            style={{ color: colors.historyModalTitleColor }}
            variant="h5"
          >
            Memories
          </Typography>
          <time>
            At 1:22 <span>By: Sub</span>
          </time>
        </div>
        <p>
          Special Moment rest is example text Enim officia ut esse Lorem qui
          officia enim tempor ea in tempor pariatur irure.
        </p>
        <hr />
      </Modal>
      <Header headerBg={bgColors.headerBg} headerColor={colors.headerColor} />
      <Navbar navbarBg={bgColors.navbarBg} navbarColor={colors.navbarColor} />
      <div className="center" style={{ backgroundColor: bgColors.mainBodyBg }}>
        <div
          className={classes.history}
          style={{ backgroundColor: bgColors.historyBlockBg }}
        >
          <div className={classes.gridContainer}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              {dummy.map(() => (
                <Grid item xs={12} sm={6} md={6} lg={3} key={Math.random()}>
                  <Card
                    sx={{ maxWidth: 345 }}
                    style={{
                      backgroundColor: bgColors.historyBlockBg,
                      border: `5px solid ${borderColors.historyCard}`,
                    }}
                    className={classes.card}
                  >
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      image="https://picsum.photos/200/300"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Movie Title
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <span onClick={() => handleOpenMemoriesModal()}>
                          See memories made by Reya
                        </span>
                        <br />
                        <span onClick={() => handleOpenMemoriesModal()}>
                          See memories made by Subu
                        </span>
                        <span onClick={() => handleOpenMemoriesModal()}>
                          I love you sweetheart
                        </span>
                        <br />
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>

      <Footer
        sendRequest={sendRequest}
        footerBg={bgColors.footerBg}
        footerBtnBg={bgColors.footerBtnBg}
        footerProfileDropdownBg={bgColors.footerProfileDropdownBg}
        footerBtnColor={colors.footerBtnColor}
        footerProfileDropdownColor={colors.footerProfileDropdownColor}
        footerProfileDropdownIC={iconColors.footerProfileDropdownIC}
      />
    </>
  );
};

export default History;
