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