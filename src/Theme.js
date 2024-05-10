// theme.js
import { createTheme } from '@mui/material/styles';
// const getcustomColorColor = (theme) => theme.palette.customColor.main;//black
const getsuccessColor = (theme) => theme.palette.success.main;//blue
const getcustomColorwhiteColor = (theme) => theme.palette.customColorwhite.main;//white
const getcustomColorredColor = (theme) => theme.palette.error.main;//red
const getcustomColorOrange = (theme) => theme.palette.customColorOrange.main;//orange

const theme = createTheme({

  palette: {
    background: {
      default: "#f2f2f2", // application pages background color for dark
    },

    error: {
      main: "#e65c00", // you can change font color
    },
    success: {
      main: "#fbfbf9", // change the color for topbar and navbar
    },
    customColorOrange: {
      main: "#ffffff", // orange color for card paper model paper
    },

    customColorwhite: {
      // main: "#808080", // white color for the table body text, button text
      main: "#424242", // white color for the table body text, button text
    },

    successone: {
      main: "#346cd4",
    }, // this is for  badge
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  customStyles: {
    modalBox: {
      p: 4,
      top: "45%",
      left: "50%",
      width: 400,
      boxShadow: 30,
      maxHeight: "100%",
      maxWidth: "100vw",
      overflowY: "auto",
      position: "absolute",
      backgroundColor: "common.white",
      transform: "translate(-50%, -50%)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          textTransform: "none",
          fontFamily: "Ruwudu",
          // padding:"20px"
        },
        containedPrimary: {
          color: getcustomColorredColor,
          backgroundColor: getcustomColorredColor, // change the add button color  in the page
          "&:hover": {
            backgroundColor: getcustomColorredColor, // change the hover color for the button in the page
          },
        }, // this is for the close button  colors

        containedSecondary: {
          color: getcustomColorwhiteColor, // button text color for the page reuseable button for the add button.
          backgroundColor: getsuccessColor, // background color for the page reuseable button for the add button.
          "&:hover": {
            backgroundColor: getsuccessColor, // background  hover color for the page reuseable button for the add button.
          },
        }, // this is for the model add or update button  colors
        containedCustom: {
          color: getcustomColorredColor, // button text color for the page reuseable button for the add button.
          borderColor:getcustomColorredColor,
          backgroundColor: getsuccessColor, // background color for the page reuseable button for the add button.
          "&:hover": {
            backgroundColor: getsuccessColor, // background  hover color for the page reuseable button for the add button.
          },
        }, 
        containedUpdateButton: {
          textColor: getcustomColorwhiteColor,
          backgroundColor: getcustomColorOrange,
          "&:hover": {
            backgroundColor: getcustomColorOrange,
          },
        },

        // this is the Add button color(orange)
        containedAddButton: {
          textColor: getcustomColorredColor, //orange color
          borderColor: getcustomColorredColor, // orange color
          backgroundColor: getcustomColorOrange, //white color
          "&:hover": {
            backgroundColor: getcustomColorOrange, //white color
          },
        },

        // this is the cancle button color(red)
        containedCancleButton: {
          textColor: getcustomColorOrange,
          borderColor: getcustomColorwhiteColor,
          backgroundColor: getcustomColorOrange,
          "&:hover": {
            backgroundColor: getcustomColorOrange,
          },
        },
      },
    },
    tables: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          textTransform: "none",
          fontFamily: "Ruwudu",
          // padding:"20px"
        },

        containedPrimarysidebar: {
          containedPrimarysidebaricon: {
            color: getcustomColorredColor, // color for the dropdown icons  in sidebar
          },
          containedPrimarysidebarheader: {
            backgroundColor: getsuccessColor, //change the background color for the sidebar
            color: getcustomColorredColor, //change the inner dropdown text
            containedPrimarysidebarheadertext: {
              color: getcustomColorredColor, //change the inner dropdown text
            },
            companyName: {
              color: getcustomColorredColor, //change the inner dropdown text
            },
            Notificationbox: {
              backgroundColor: getcustomColorOrange, //change the inner dropdown text
            },
          },
        },
        containedCustombaricons: {
          color: getcustomColorredColor, // you can change sider bar icons
        },
        containedPrimarypaper: {
          backgroundColor: getcustomColorOrange, // paper backgroundcolor for the page name and button paper
        },
        containedPrimarycardpaper: {
          backgroundColor: getcustomColorOrange, // card background color for the all card
        },

        containedPrimaryModelPaper: {
          backgroundColor: "#FFFFFF", //  background color for the model form
        },
        containedPrimarytablehead: {
          backgroundColor: getsuccessColor, // Change the color for table head background color.
          color: getcustomColorredColor, // change the text color for the table head text.
        },
        containedPrimarytablebody: {
          backgroundColor: getcustomColorOrange,
          color: getcustomColorwhiteColor, // change the color for the table body text color.
        },

        containedCustomedit: {
          color: getsuccessColor, // you can change the edit icon color
        },
        containedCustomdelete: {
          color: getcustomColorredColor, // you can change delete icon color
        },

        containedCustomdropdownnames: {
          color: getcustomColorwhiteColor, // you can change delete icon color
        },
      },
    },
  },
});
theme.typography.h1 = {
  fontWeight: 600,
  lineHeight: 1.1,
  fontFamily: "Arial",
  fontSize: "1.35rem",
  color: getcustomColorredColor(theme), // Using the function to dynamically assign color
};

theme.typography.h2 = {
  fontWeight: 600,
  lineHeight: 1.3,
  fontFamily: "Arial",
  fontSize: "1.65rem",
  color: getcustomColorredColor(theme), // Using the function to dynamically assign color
};
theme.typography.h3 = {
  fontWeight: 'bold',
  lineHeight: 1.4,
  fontFamily: "Arial",
  fontSize: 20,
  color: getcustomColorredColor(theme), // Using the function to dynamically assign color
};
theme.typography.h4 = {
  fontWeight: 200,
  lineHeight: 0.5,
  fontFamily: "Arial",
  fontSize: '0.9rem',
  color: getcustomColorredColor(theme), // Using the function to dynamically assign color
};
theme.typography.h5 = {
  // side bar parent names
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  color: getcustomColorredColor(theme),
  fontWeight: '400',
  fontSize: '15px',
  lineHeight: "1.5",
  opacity: "1.3"
};
theme.typography.h6 = {
  fontSize: '0.8525rem',
  lineHeight: 1.77,
  display: 'block',
  color: getcustomColorredColor(theme)
};
theme.typography.h7 = {

  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontWeight: 400,
  fontSize: '0.8125rem',
  lineHeight: 1.53,
  color: getcustomColorredColor(theme),
  display: 'block'
};

theme.typography.h8 = {
  fontWeight: 550,
  fontFamily: "Ruwudu",
  fontSize: '1.40rem',
  color: getcustomColorredColor(theme), // Default font size for subtitle2
};

theme.typography.h9 = {
  fontSize: '0.9525rem',
  fontStyle: 'italic',
  fontWeight: '550',
  display: 'block',
  color: getcustomColorredColor(theme)
};

theme.typography.h10 = {
  fontSize: '0.6525rem',
  fontStyle: 'italic',
  fontWeight: '550',
  display: 'block',
  color: getcustomColorredColor(theme)
};

theme.typography.subtitle1 = {
  fontWeight: 400,
  lineHeight: 1.4,
  fontFamily: "Ruwudu",
  fontSize: '1.15rem',
  color: getcustomColorredColor(theme), // Default font size for subtitle2
};



theme.typography.subtitle2 = {
  fontWeight: 400,
  lineHeight: 1.4,
  fontFamily: "Ruwudu",
  fontSize: '1.15rem',
  color: getcustomColorredColor(theme), // Default font size for subtitle2
};

theme.typography.subtitle3 = {
  color: getcustomColorredColor(theme),
}


theme.components.MuiPagination = {
  styleOverrides: {
    root: {
      // "& .Mui-selected": {
      //   backgroundColor: getcustomColorOrange(theme), // Use custom color function for background
      //   color: getcustomColorredColor(theme), // Use custom color function for text color
      //   borderColor:getcustomColorredColor(theme),
      // },
      // "& .MuiPaginationItem-root:hover": {
      //   backgroundColor: getcustomColorredColor(theme), // Use custom color function for background
      //   color: getcustomColorOrange(theme), // Use custom color function for text color
      // },
      // "& .MuiPaginationItem-page": {
      //   color: getcustomColorredColor(theme), // Change color for the count
      // },
      // "& .MuiPaginationItem-icon": {
      //   color: getcustomColorredColor(theme), // Change color for the arrows
      // },
    },
  },
};
// pagenation dark theme mood



export default theme;



