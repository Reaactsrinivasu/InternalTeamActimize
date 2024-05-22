import React from 'react';
import Carousel4d from "../dashboardUtils/Carousel4d";
import HolidaysCard from "../dashboardUtils/HolidaysCard";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import theme from '../Theme';
import NoDataFoundDashBoard from '../components/NoDataFoundDashBoard';
const HolidaysSlider = (props) => {
    const [holidays, setHolidays] = useState([]);
    let dashboardDetails = useSelector((state) => state.dashboardData.data);
    useEffect(() => {

        if (dashboardDetails) {
            let dashboard_holidays = dashboardDetails?.holidays;
            dashboard_holidays = dashboard_holidays?.map((item, index) => ({ id: index + 1, ...item }));
            setHolidays(dashboard_holidays);
        }
    }, [dashboardDetails]);

    const holiday = [{ date: '17-04-2024', title: 'Sri Rama Navami' }, { date: '03-04-2024', title: 'Holy' }, { date: '03-04-2024', title: 'Holy' }, { date: '03-04-2024', title: 'Holy' },, { date: '03-04-2024', title: 'Holy' }, { date: '03-04-2024', title: 'Holy' }]
    return (
        // <div
        //     className="App"
        //     style={{
        //         display: "flex",
        //         justifyContent: "center",
        //         alignItems: "center",
        //         overflow: "hidden",
        //         boxShadow: '10px 10px 80px rgba(0, 0, 0, 0.1)',
        //     }}
        // >
        //     <div style={{ width: '100%', maxWidth: '80%', height: "23rem", border:'2px solid green' }}>
        //         {holidays?.length > 0 && (<Carousel4d
        //             cards={holidays?.map((item, index) => (
        //                 {
        //                     key: index,
        //                     content: <HolidaysCard  title={item?.title} date={item?.date} />
        //                 }
        //             ))}
        //             offset={2}
        //         />)}
        //     </div>
        // </div>
        <>
            <Grid container sx={{ justifyContent: 'center', height: "23rem",}}>
              
                       <Grid item xs={10} sx={{ margin: '30px 0px', backgroundColor: theme.palette.success.main, borderRadius: '10px' }}>
                    <Grid sx={{ marginTop: '20px' }}>
                        <Typography variant='subtitle1' sx={{ textAlign: 'center', display :props.display || 'block'  }}>Upcoming Holidays</Typography>
                    </Grid>
                    <Grid container item xs={11} sx={{ margin: 'auto', padding: '5px 0px', maxHeight:'240px', overflowY:'scroll','&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.error.main, 
                    borderRadius: '10px',
                  }, }}>
                        {holidays.map((item) => (
                            <>
                                <Grid item xs={12} sx={{ display: 'flex', borderBottom: '1px solid', borderColor: theme.palette.background.default , padding:'10px 0px'}}>
                                    <Grid item xs={6}>
                                        <Typography variant='h6' sx={{ textAlign: 'center', }} >{item.title}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='h6' sx={{ textAlign: 'center' }}>{item.date}</Typography>
                                    </Grid>
                                </Grid>
                            </>
                        ))}

                    </Grid>
                </Grid>
             
            </Grid>
        </>
    );
};
export default HolidaysSlider;