import React from "react";
import { Paper } from "@mui/material/";
import theme from "../Theme";
const ReusablePaper = (props) => {
  return (
    <>
      <Paper
        sx={{
          padding: "10px",
          mb: 2,
          mt: 2,
          boxShadow: "0px 10px 80px rgba(0, 0, 0, 0.1)",
          // bgcolor: "#ffffff",
          // bgcolor: "#f9f9f9",
          // backgroundColor: theme.palette.customColor.main,
          // bgcolor: "#e0e0e0", // Darker gray
           backgroundColor:  theme.components.tables.styleOverrides.containedPrimarypaper.backgroundColor,
          borderRadius: "10px",
          ...props.sx,
        }}
          >
              {props.children}
      </Paper>
    </>
  );
};
export default ReusablePaper;