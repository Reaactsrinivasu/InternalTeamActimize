import React from 'react';
import Pagination from "@mui/material/Pagination";
import theme from "../Theme";
const ReusablePagination = (props) => {
    return (
      <>
        <Pagination
          variant={props.variant}
          onChange={props.onChange}
          count={props.count}
          // page={props.page ? props.page : ''}
          page={props.page}
          hidePrevButton
          hideNextButton
          sx={{
            ...props.sx,
            "& .MuiPaginationItem-root.Mui-selected": {
              border: "1px solid",
              color:
                theme.components.MuiButton.styleOverrides.containedAddButton
                  .textColor,
              backgroundColor:
                theme.components.MuiButton.styleOverrides.containedAddButton
                  .backgroundColor,
              borderColor:
                theme.components.MuiButton.styleOverrides.containedAddButton
                  .borderColor,
              "&:hover": {
                backgroundColor:
                  theme.components.MuiButton.styleOverrides.containedAddButton
                    .textColor,
                color:
                  theme.components.MuiButton.styleOverrides.containedAddButton
                    .backgroundColor,
              },
            },
            "& .MuiPaginationItem-page": {
              color:
                theme.components.MuiButton.styleOverrides.containedAddButton
                  .textColor,
            },
            "& .MuiPaginationItem-icon": {
              color:
                theme.components.MuiButton.styleOverrides.containedAddButton
                  .textColor,
            },
          }}
        />
      </>
    );
};

export default ReusablePagination;