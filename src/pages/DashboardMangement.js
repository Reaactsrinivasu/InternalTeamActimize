import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadDashboardMangementDetailsStart } from '../redux/actions/dashboardMangementActions';
import Carousel3d from "../dashboardUtils/Carousel3d";
import CarouselCard from "../dashboardUtils/CarouselCard";
import Controls from "../components/Controls";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
import LoadingComponent from '../components/LoadingComponent';
import HolidaysSlider from './HolidaysSlider';
import { Paper, TableCell, TableHead, TableRow, TableContainer, TableBody, Table } from '@mui/material';
const DashboardMangement = () => {
  const dispatch = useDispatch();
  const dashboardmangment = useSelector((state) => state.dashboardMangementData?.data || []);
  const holidays = useSelector((state) => state.dashboardMangementData?.data?.holidays || []);
  const birthdays = dashboardmangment?.birthdays;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(loadDashboardMangementDetailsStart());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  })



  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (

        <ThemeProvider theme={theme}>
          <>
            <Controls.Grid spacing={2} container rowSpacing={2} columnSpacing={5}>
              <Controls.Grid item xs={12} sm={6} md={4} lg={6} sx={{ boxShadow: '100px rgba(0, 0, 0, 0.1)' }}>

                <Controls.Card sx={{
                  borderRadius: '15px', textAlign: 'center',
                  backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor
                }}>
                  <Controls.Typography variant="h2">Upcoming Holidays</Controls.Typography>
                  {/* <div
              className="App"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                boxShadow: '10px 10px 80px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div style={{ width: '100%', maxWidth: '80%', height: "23rem", }}>
                {holidays?.length > 0 && (<Carousel4d
                  cards={holidays?.map((item, index) => (
                    {
                      key: index,
                      content: <HolidaysCard title={item?.title} date={item?.date} />
                    }
                  ))}
                  offset={2}
                />)}
              </div>
            </div>  */}
                  {/* { <HolidaysSlider />} */}
                  <Controls.Grid container sx={{ justifyContent: 'center', height: "23rem", }}>
                    <Controls.Grid item xs={10} sx={{ margin: '30px 0px', backgroundColor: theme.palette.success.main, borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                      <Controls.Grid container item xs={11} sx={{
                        margin: 'auto', padding: '5px 0px', maxHeight: '240px', overflowY: 'scroll', '&::-webkit-scrollbar': {
                          width: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: theme.palette.error.main,
                          borderRadius: '10px',
                        },
                      }}>
                        <TableContainer >
                          <Table sx={{ minWidth: 350,border: `2px solid ${theme.palette.error.main}` }} aria-label="simple table">
                            <TableHead sx={{ backgroundColor: theme.palette.error.main, }}>
                              <TableRow>
                                <TableCell align="center" sx={{ color: theme.palette.success.main }}>SNO</TableCell>
                                <TableCell align="center" sx={{ color: theme.palette.success.main }}>Holiday Name</TableCell>
                                <TableCell align="center" sx={{ color: theme.palette.success.main }}>Date</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {holidays && holidays.map((row, index) => (
                                <TableRow
                                  key={index} 
                                  sx={{
                                    backgroundColor:theme.palette.customColorOrange.main,
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '& td, & th': { borderBottom: `2px solid ${theme.palette.error.main}` }, 
                                  }}
                                >
                                  <TableCell align="center" component="th" scope="row" sx={{ color: theme.palette.error.main, fontWeight: 'bold' }}>
                                    {index + 1}
                                  </TableCell>
                                  <TableCell align="center" sx={{ color: theme.palette.error.main, fontWeight: 'bold' }}>{row.title}</TableCell>
                                  <TableCell align="center" sx={{ color: theme.palette.error.main, fontWeight: 'bold' }}>{row.date}</TableCell>

                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                      </Controls.Grid>
                    </Controls.Grid>
                  </Controls.Grid>
                </Controls.Card>

              </Controls.Grid>
              <Controls.Grid item xs={12} sm={6} md={4} lg={6} sx={{ boxShadow: '100px rgba(0, 0, 0, 0.1)' }}>

                <Controls.Card sx={{ borderRadius: '15px', textAlign: 'center', backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor }}>
                  <Controls.Typography variant="h2">Upcoming Birthdays</Controls.Typography>
                  <Controls.Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                      boxShadow: '10px 10px 80px rgba(0, 0, 0, 0.1)'
                    }}>
                    <Controls.Box style={{ width: '100%', maxWidth: '60%', height: "23rem" }}>
                      {/* {birthdayCards.length > 0 && (
                      <Carousel3d cards={birthdayCards} offset={2} />)} */}
                      {birthdays?.length > 0 && (<Carousel3d
                        cards={birthdays?.map((item, index) => (
                          {
                            key: index,
                            content: <CarouselCard
                              age={item?.date_of_birth}
                              designation={item?.designation}
                              title={`${item?.first_name} ${item?.last_name}`}
                              src={item?.profile_pic}
                              display={false}
                            />
                          }
                        ))}
                        offset={2}
                      />)}

                    </Controls.Box>
                  </Controls.Box>
                </Controls.Card>

              </Controls.Grid>
            </Controls.Grid>
          </>
        </ThemeProvider>
      )}
    </>
  );
};
export default DashboardMangement;