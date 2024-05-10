import { display } from "@mui/system";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import SquareBorder1 from "../assets/images/square-border1.png";
import { Box, Card, Grid, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import theme from "../Theme";
// const CarouselCard = ({ date, day, title, currentSlide, currentIndex, }: any) => {
// const CarouselCard = ({ date, day, title, currentSlide, currentIndex, }) => {
const CarouselCard = ({ title, date }) => {
    const [show, setShown] = useState(false);
    const styles = useSpring({
        transform: show ? "scale(1.03)" : "scale(1)",
        boxShadow: show
            ? "0 20px 25px rgb(0 0 0 / 25%)"
            : "0 2px 10px rgb(0 0 0 / 8%)"
    });
    return (
        <>

        {/* <Grid container>
            <Typography variant="subtitle1" sx={{margin:'auto', paddingBottom:'20px', color:theme.palette.success.main, fontWeight:'bold'}}>Upcoming Holidays</Typography>
            <animated.div
                style={{ ...styles, height: "fit-content" }}
                onMouseEnter={() => setShown(true)}
                onMouseLeave={() => setShown(false)}
            >
                <div
                    style={{
                        background: "rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(22px)",
                        position: "relative",

                    }}
                >
                    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
                      <img
                          src={SquareBorder1}
                          alt="SquareBorder1"
                          style={{ objectFit: "fill", width: "100%", height: "100%" }}
                      />
                  </div>
                    <Card
                        style={{
                            padding:'40px 20px',
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "220px",
                            width: '200px',
                            backgroundColor: theme.palette.success.main,

                        }}
                    >
                        <Typography variant="h4"
                            sx={{ textAlign: 'center', marginBottom:'20px' }}
                        >{title}</Typography>

                        <Typography variant="subtitle1"
                            sx={{ textAlign: 'center',  }} >{date}</Typography>

                    </Card>
                </div>
            </animated.div>
            </Grid> */}

            <Grid container item xs={12}  sx={{border:'2px solid red', width:'100%'}}>
                <Grid sx={{border:'2px solid blue'}}>
                    <Grid>
                        <Typography variant="subtitle1">Upcoming Holidays</Typography>
                    </Grid>
                </Grid>

            </Grid>


        </>
    );
};

export default CarouselCard;