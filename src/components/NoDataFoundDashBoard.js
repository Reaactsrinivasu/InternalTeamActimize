import React from "react";
import Controls from "./Controls";

const NoDataFoundDashBoard = () => {
    return(
        <>
        <Controls.Grid container sx={{justifyContent:'center'}}>
        <Controls.Grid>
          <img src="https://static.vecteezy.com/system/resources/thumbnails/007/872/974/small/file-not-found-illustration-with-confused-people-holding-big-magnifier-search-no-result-data-not-found-concept-can-be-used-for-website-landing-page-animation-etc-vector.jpg" alt="No Data Found" style={{width: 300}} />
          <Controls.Typography sx={{fontFamily:'Monospace',textAlign:'center'}}>No Data Found !</Controls.Typography>
        </Controls.Grid>
        </Controls.Grid>
        </>
    )
}

export default NoDataFoundDashBoard;