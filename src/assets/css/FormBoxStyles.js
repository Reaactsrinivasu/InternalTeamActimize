import theme from "../../Theme";
const formBoxStyle = {
    p: 4,
    top: "45%",
    left: "50%",
    width: 400,
    boxShadow: 30,
    maxHeight: "100%",
    maxWidth: "100vw",
    overflowY: "auto",
    position: "absolute",
    borderRadius: "5px",
    // boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
    // bgcolor: 'background.paper',
    // backgroundColor: (theme) => theme.palette.common.white,
    backgroundColor:  theme.components.tables.styleOverrides.containedPrimaryModelPaper.backgroundColor,
    transform: "translate(-50%, -50%)",
  };
   
  export default formBoxStyle;