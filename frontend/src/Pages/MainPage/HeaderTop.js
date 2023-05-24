import { Box, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import CustomButton from "./CustomButton";
import profilevid from '../../assets/ForProfile2.mp4'
import farmer2u_logo from '../../assets/farmers2u_logo.png'
import './Main.css';


const HeaderTop = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    marginTop: "70px",
    justifyContent: "center",
    gap: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));
/*         <Player
        playsInline
        poster="/assets/poster.png"
        src={videobg}
        fluid={false}
        width={480}
        height={272}
      />  */
  return (
    <Box dir="rtl" sx={{ backgroundColor: "", minHeight: "80vh" }}>
    <div className='overlay'> <div className='farmers2u' style={{ fontFamily: "Secular One", color: "#52d7de", fontSize: '58px'  }}> היכנסו לחוויית חקלאות ישירה </div>
    <div className='headline' style={{ fontFamily: "Secular One", color: "#52d7de", fontSize: '58px'  }}> Farmers2U </div> </div>
        <video src={profilevid} autoPlay loop muted id='bg-video' />
      <Container>
        <CustomBox>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
                mt: 10,
                mb: 4,
              }}
            >
            <h1 style={{ fontFamily: "Secular One", color: "blue" }}> ברוכים הבאים ל Farmers2U</h1> 

            </Typography>
            <Title variant="h1">
                הכירו את הפלטפורמה לתקשורת ישירה בין צרכנים לחקלאים.
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "21.8px", color: "#5A6473", my: 4 }}
            >
כאן תוכלו למצוא לוח מודעות ופרופילים של חקלאים מכל רחבי הארץ, לפרסום וקניית הסחורות הטובות ביותר!
            </Typography>
            <a href="bullboard">
            <CustomButton
              backgroundColor="#0F1B4C"
              color="#fff"
              buttonText="לוח המודעות"
              heroBtn={true}
            /> </a>
          </Box>
            <img
            src={farmer2u_logo}
              alt="farmers2u"
              height={100}
              marginTop={0}
              marginRight={100}
              style={{ maxWidth: "100%"}}
            />
          
        </CustomBox>
      </Container>
    </Box>
  );

};

export default HeaderTop;