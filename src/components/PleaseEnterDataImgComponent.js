import React from "react";
import Controls from "./Controls";

const PleasEnterDataImgComponent = ({text}) => {
    return(
        <>
        <Controls.Grid >
            <img src="https://clipground.com/images/keyboarding-clipart-5.png" style={{maxWidth:"350px", height:'auto'}} />
            <Controls.Typography sx={{textAlign:'center', fontFamily:'Monospace', fontSize:'18px'}}>Please Enter <span>{text}</span></Controls.Typography>
        </Controls.Grid>
        </>
    );
}

export default PleasEnterDataImgComponent;