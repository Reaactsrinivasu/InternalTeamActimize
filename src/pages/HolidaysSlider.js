import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import theme from '../Theme';
import { Paper, TableCell, TableHead, TableRow, TableContainer, TableBody, Table } from '@mui/material';
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

    return (
        <>
            <Grid container sx={{ justifyContent: 'center', height: "23rem",}}>
              
                       <Grid item xs={10} sx={{ margin: '30px 0px', backgroundColor: theme.palette.success.main, borderRadius: '10px', }}>
                    <Grid sx={{ marginTop: '20px' }}>
                        <Typography variant='subtitle1' sx={{ textAlign: 'center', display :props.display || 'block'  }}>Upcoming Holidays</Typography>
                    </Grid>
                    {/* <Grid container item xs={11} sx={{ margin: 'auto', padding: '5px 0px', maxHeight:'240px', overflowY:'scroll','&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.error.main, 
                    borderRadius: '10px',
                  }, }}>
                        {holidays.map((item) => (
                            <>
                                <Grid item xs={12} sx={{ display: 'flex', borderBottom: '1px solid', borderColor: theme.palette.error.main , padding:'15px 0px'}}>
                                    <Grid item xs={6}>
                                        <Typography variant='h6' sx={{ textAlign: 'center', }} >{item.title}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='h6' sx={{ textAlign: 'center' }}>{item.date}</Typography>
                                    </Grid>
                                </Grid>
                            </>
                        ))}

                    </Grid> */}
                    <Grid sx={{marginTop:'10px'}}>
                    <TableContainer >
                          <Table sx={{ minWidth: 250,border: `2px solid ${theme.palette.error.main}` }} aria-label="simple table">
                            <TableHead sx={{ backgroundColor: theme.palette.error.main, }}>
                              <TableRow>
                                <TableCell align="center" sx={{ color: theme.palette.success.main }}>Holiday Name</TableCell>
                                <TableCell align="center" sx={{ color: theme.palette.success.main }}>Date</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody sx={{backgroundColor:theme.palette.customColorOrange.main}}>
                              {holidays && holidays.map((row, index) => (
                                <TableRow
                                  key={index}
                                   sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '& td, & th': { borderBottom: `2px solid ${theme.palette.error.main}` }, 
                                  }}
                                >
                                  <TableCell align="center" sx={{ color: theme.palette.error.main, fontWeight: 'bold' }}>{row.title}</TableCell>
                                  <TableCell align="center" sx={{ color: theme.palette.error.main, fontWeight: 'bold' }}>{row.date}</TableCell>

                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        </Grid>
                </Grid>
             
            </Grid>
        </>
    );
};
export default HolidaysSlider;