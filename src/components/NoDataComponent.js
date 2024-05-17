import React from 'react';
import Controls from './Controls';
 
const NoDataFound = () => {
  return (
    <>
    <Controls.Grid container sx={{justifyContent:'center'}}>
       <Controls.Grid>
         <img src="/assets/images/NoDataImg.png" alt="No Data Found" style={{width: 300}} />
         <Controls.Typography sx={{fontFamily:'Monospace',textAlign:'center'}}>No Data Found !</Controls.Typography>
       </Controls.Grid>
       </Controls.Grid>
   </>
  );
};
 
export default NoDataFound;