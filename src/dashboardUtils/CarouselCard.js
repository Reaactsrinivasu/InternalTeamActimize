import { display } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import SquareBorder1 from "../assets/images/square-border1.png";
import { Box, Card, Grid, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import theme from "../Theme";
import CakeIcon from '@mui/icons-material/Cake';
const CarouselCard = ({ designation, age, title, src, currentSlide, currentIndex, display }) => {
  const [show, setShown] = useState(false);
  const [imageurl, setImageUrl] = useState(null);

  const styles = useSpring({});

  useEffect(() => {
    if (src && src) {
      const base64Image = src;
      const base64String = base64Image.split(';base64,').pop();
      const cleanedBase64 = base64String.replace(/[^A-Za-z0-9+/]/g, '');

      try {
        const binaryString = window.atob(cleanedBase64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
      } catch (error) {
        console.error('Error decoding base64 string:', error);
      }
    }
  }, [src]);



  return (
    <>
      <Grid container sx={{ justifyContent: 'center' }}>
        <animated.div
          style={{ ...styles, height: "fit-content" }}
          onMouseEnter={() => setShown(true)}
          onMouseLeave={() => setShown(false)}
        >
          <div
            style={{
            }}
          >
            {/* ... Other card content ... */}

            <Card
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: '10px',
                // boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                width: '250px',
                margin: '20px 0px',
                backgroundColor: theme.palette.success.main
              }}
            >
              {display ? (
                <Typography variant="subtitle1" sx={{ marginBottom: '10px', }}>Up coming Birthdays</Typography>
              ) : (
                <Typography variant="subtitle1" sx={{ marginBottom: '10px', }}>Happy Birthday</Typography>
              )}
              <div
                style={{
                  overflow: "hidden",
                  borderRadius: '50%',
                  border: '4px solid #fff',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }}
              >

                <Avatar
                  src={imageurl}
                  alt="profile"
                  style={{ objectFit: 'cover', width: "100px", height: "100px" }}
                />
              </div>

              {title && designation && age && (
                <CardContent
                  sx={{ display: 'block', marginTop: '5px' }}
                >
                  <Grid >
                    <Typography variant="h3" sx={{ textAlign: 'center', }}>
                      {title}
                    </Typography>
                  </Grid>

                  <Typography variant="h5" sx={{ textAlign: 'center' }}>
                    {age}
                  </Typography>
                  <Typography sx={{ textAlign: 'center', }} variant="h5">{designation}</Typography>
                </CardContent>
              )}
            </Card>
          </div>
        </animated.div>
      </Grid>
    </>
  );
};

export default CarouselCard;