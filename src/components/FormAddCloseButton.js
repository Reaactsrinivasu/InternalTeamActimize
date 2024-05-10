import React from 'react';
import { Button } from "@mui/material/";
import theme from "../Theme";
const FormAddCloseButton = (props) => {
    let buttonVariant = props.buttonVariant;
    return (
      <>
        <Button
          variant={!buttonVariant ? "contained" : buttonVariant}
          type={props.buttonType}
          size={props.buttonSize}
          startIcon={props.startIcon}
          onClick={props.onClick}
          disabled={props.disabled}
          sx={{
            color:
              theme.components.MuiButton.styleOverrides.containedAddButton
                .textColor,
            backgroundColor:
              theme.components.MuiButton.styleOverrides.containedAddButton
                .backgroundColor,
            borderColor:
              theme.components.MuiButton.styleOverrides.containedAddButton
                .borderColor,
            border: "1px solid",
            "&:hover": {
              backgroundColor:
                theme.components.MuiButton.styleOverrides.containedAddButton
                  .backgroundColor,
            },
            ...props.sx,
          }}
        >
          {props.buttonText}
        </Button>
      </>
    );
};

export default FormAddCloseButton