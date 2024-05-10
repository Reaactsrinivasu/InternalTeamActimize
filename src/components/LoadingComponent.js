import React from "react";
import Controls from "./Controls";

const LoadingComponent = () => {
    return(
        <>
        <Controls.Grid container sx={{justifyContent:'center', marginTop:'15%'}}>
        <Controls.Grid>
        <img src="https://images.yourstory.com/cs/images/companies/9c8b94c1074c-202107190215022removebgpreview1-1663829828572.jpg?fm=auto&ar=1:1&mode=fill&fill=solid&fill-color=fff"  style={{width:'50px', height:'50px'}}/>
        </Controls.Grid>
        </Controls.Grid>
        </>
    )
}
export default LoadingComponent;