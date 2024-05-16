import React from "react";
import Controls from "./Controls";
import { PulseLoader } from "react-spinners";
import theme from "../Theme";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const LoadingComponent = () => {
    return (
        <>
            <Controls.Grid container sx={{ justifyContent: 'center', marginTop: '17%' }}>
                <Controls.Grid>
                    <PulseLoader
                        color={theme.palette.error.main}
                        loading={true}
                        css={override}
                        size={10}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </Controls.Grid>
            </Controls.Grid>
        </>
    )
}
export default LoadingComponent;