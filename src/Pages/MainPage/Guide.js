import { Box, Button, styled, Typography } from "@mui/material";
import React from "react";

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Guide = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "85%",
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
        sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3 }}
      >
        איך זה עובד?
      </Typography>

      <CustomBox>
        <Typography
          variant="body2"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#5A6473",
            textAlign: "center",
          }}
        >
הפעולה פשוטה ומהירה - פשוט צרו קשר עם החקלאים המתאימים לכם ובצעו את העסקאות ישירות ביניכם.
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