import React from 'react';
import { Button } from '@mui/material/';
import theme from "../Theme";
const ReuseableButton = (props) => {
   let buttonVariant = props.buttonVariant;
   let buttonText = props.buttonText;

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
          backgroundColor:
            theme.components.MuiButton.styleOverrides.containedAddButton
              .backgroundColor,
          "&:hover": {
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
