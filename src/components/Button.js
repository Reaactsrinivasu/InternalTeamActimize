import React from 'react';
import { Button } from '@mui/material/';
import theme from "../Theme";
const ReuseableButton = (props) => {
   let buttonVariant = props.buttonVariant;
   let buttonColor = props.buttonColor;
   let buttonText = props.buttonText;
   let hoverColor = props.hoverColor; // New prop for hover color
   let textColor = props.textColor; // New prop for text color
   let bgcolor = props.bgcolor;
   let disabled = props.disabled;

  return (
    <>
      <Button
        type={props.buttonType}
        size={props.buttonSize}
        variant={!buttonVariant ? "contained" : buttonVariant}
        color="success"
        sx={{
          textTransform: "none",
          borderRadius: "20px",
          boxShadow: "0px 10px 80px rgba(0, 0, 0, 0.1)",
          border: "1px solid",
          borderColor:
            theme.components.MuiButton.styleOverrides.containedCustom.borderColor,
          color:
            theme.components.MuiButton.styleOverrides.containedCustom.color,
          paddingTop: "10px",
          // color: "white", // Apply text color
          // bgcolor: theme.components.MuiButton.styleOverrides.containedCustom.backgroundColor,
          // '&:hover': {
          //   bgcolor: theme.components.MuiButton.styleOverrides.containedCustom.backgroundColor,
          // },
          // backgroundColor: !buttonText
          //   ? theme.components.MuiButton.styleOverrides.containedAddButton
          //   : bgcolor,
          backgroundColor:
            theme.components.MuiButton.styleOverrides.containedAddButton
              .backgroundColor,
          "&:hover": {
            // bgcolor: !buttonText ? "#4d79ff" : bgcolor,
            backgroundColor:
              theme.components.MuiButton.styleOverrides.containedAddButton
                .backgroundColor,
          },

          ...props.sx,
        }}
        disabled={props.disabled}
        startIcon={props.startIcon}
        onClick={props.onClick}
      >
        {!buttonText ? "Add" : buttonText}
      </Button>
    </>
  );
};

export default ReuseableButton;
