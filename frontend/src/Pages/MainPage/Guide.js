import { Box, Button, styled, Typography } from "@mui/material";
import React from "react";

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Guide = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
  }));

  const GuidesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    width: "70%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0",
      flexDirection: "column",
    },
  }));

  const GuideBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));

  return (
    <Box dir="rtl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: '15vh'
      }}
    >

      <div
        style={{
          width: "5%",
          height: "5px",
          backgroundColor: "#000339",
          margin: "0 auto",
        }}
      ></div>
      <Typography
        variant="h3"
        sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3, mr: 2 }}
      >
        צרכנים?
      </Typography>

      <CustomBox  display= 'flex' flexDirection= 'column' justifyContent= 'space-between' textAlign= 'flex-start' gap={2} mr={3}>
        <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            // textAlign: "center",
          }}
        >
          1. היכנסו ללוח המודעות וחפשו מודעות רלוונטיות באמצעות סרגל הסינון
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            // textAlign: "center",
          }}
        >
          2. מצאתם עסק שאהבתם? כנסו לדף העסק ע"י לחיצה על תמונת הפרופיל או על שם העסק
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            // textAlign: "center",
          }}
        >
          3. מעוניינים לקרוא על עוד עסקים המשתמשים באתר? היכנסו לעמוד 'החקלאים שלנו'
        </Typography>
      </CustomBox>

      <div
        style={{
          width: "5%",
          height: "5px",
          backgroundColor: "#000339",
          marginTop: '10vh'
        }}
      ></div>
      <Typography
        variant="h3"
        sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3 ,mr: 2 }}
      >
        חקלאים?
      </Typography>

      <CustomBox  display= 'flex' flexDirection= 'column' justifyContent= 'space-between' textAlign= 'flex-start' gap={2} mr={3}>
        <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            // textAlign: "center",
          }}
        >
          1. הירשמו לאתר ע"י מילוי פרטים בנוגע לעסק בטופס ההרשמה או התחברו במידה והמשתמש כבר קיים
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            // textAlign: "center",
          }}
        >
          2. היכנסו לאזור האישי או ללוח המודעות ולחצו על האייקון '+'
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            // textAlign: "center",
          }}
        >
          3. הוסיפו מלל חופשי בנוגע למודעה אותה תרצו לפרסם
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            // textAlign: "center",
          }}
        >
          4. מלאו את הפרטים: מיקום, תאריך, טווח שעות, טווח מחירים והוסיפו תמונות במידת הצורך
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            // textAlign: "center",
          }}
        >
          5. לחצו על 'פרסום מודעה'
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            // textAlign: "center",
          }}
        >
          6. מעוניינים לעדכן את הפרטים המופיעים בדף העסק? עשו זאת דרך האזור האישי
        </Typography>
      </CustomBox>

      

      <GuidesBox>
        <GuideBox>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            החקלאים שלנו
          </Typography>
          <a href="ourfarmers">
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
            >
              לקטלוג
            </Typography>
            <KeyboardBackspaceIcon style={{ color: "#0689FF" }} />
          </Box> </a>
        </GuideBox>

        <GuideBox>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            חקלאים? 
          </Typography>
          <a href="signup">
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
            >
              הירשמו עוד היום
            </Typography>
            <KeyboardBackspaceIcon style={{ color: "#0689FF" }} />
          </Box> </a>
        </GuideBox>

        <GuideBox>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            רוצים לדעת עוד? 
          </Typography>
          <a href="about">
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
            >
              על האתר
            </Typography>
            <KeyboardBackspaceIcon style={{ color: "#0689FF" }} />
          </Box> </a>
        </GuideBox>
      </GuidesBox>

    </Box>
  );
};

export default Guide;