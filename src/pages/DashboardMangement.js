import React, { useEffect, useState } from 'react';
import Carousel4d from "../dashboardUtils/Carousel4d";
import HolidaysCard from "../dashboardUtils/HolidaysCard";
import { useSelector, useDispatch } from 'react-redux';
import { loadDashboardMangementDetailsStart } from '../redux/actions/dashboardMangementActions';
import Carousel3d from "../dashboardUtils/Carousel3d";
import CarouselCard from "../dashboardUtils/CarouselCard";
import Controls from "../components/Controls";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
import HolidaysSlider from './HolidaysSlider';
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';
const DashboardMangement = () => {
  const dispatch = useDispatch();
  const dashboardmangment = useSelector((state) => state.dashboardMangementData?.data || []);
  const holidays = useSelector((state) => state.dashboardMangementData?.data?.holidays || []);
  const birthdays = dashboardmangment?.birthdays;
  const [loading , setLoading] = useState(true);
  const birthdayCards = (birthdays || []).map((birthday, index) => ({
    key: index,
    content: (
      <CarouselCard
        age={birthday.date_of_birth}
        designation={birthday.designation}
        title={`${birthday.first_name} ${birthday.last_name}`}
        image={birthday.profile_pic} />)
  }));
  useEffect(() => {
    dispatch(loadDashboardMangementDetailsStart());
  }, []);

    useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1500)
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
          
            {holidays?.length > 0 ? (
              <>
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
            </div> */}
              {/* { <HolidaysSlider />} */}
              <Controls.Grid container sx={{ justifyContent: 'center', height: "23rem", }}>
                <Controls.Grid item xs={10} sx={{ margin: '30px 0px', backgroundColor: theme.palette.success.main, borderRadius: '10px' }}>

                  <Controls.Grid container item xs={11} sx={{
                    margin: 'auto', padding: '5px 0px', maxHeight: '240px', overflowY: 'scroll', '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: theme.palette.error.main,
                      borderRadius: '10px',
                    },
                  }}>
                    {holidays.map((item) => (
                      <>
                        <Controls.Grid item xs={12} sx={{ display: 'flex', borderBottom: '1px solid', borderColor: theme.palette.background.default, padding: '10px 0px' }}>
                          <Controls.Grid item xs={6}>
                            <Controls.Typography variant='h6' sx={{ textAlign: 'center', }} >{item.title}</Controls.Typography>
                          </Controls.Grid>
                          <Controls.Grid item xs={6}>
                            <Controls.Typography variant='h6' sx={{ textAlign: 'center' }}>{item.date}</Controls.Typography>
                          </Controls.Grid>
                        </Controls.Grid>
                      </>
                    ))}

                  </Controls.Grid>
                </Controls.Grid>
              </Controls.Grid>
          </Controls.Card>
              </>
              
            ) : (
              <>
               <NoDataFound />
               </>
            )}
        </Controls.Grid>
        <Controls.Grid item xs={12} sm={6} md={4} lg={6} sx={{ boxShadow: '100px rgba(0, 0, 0, 0.1)' }}>
          {birthdays?.length > 0 ? (
           
              <>
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
                          />
                        }
                      ))}
                      offset={2}
                    />)}
  
                  </Controls.Box>
                </Controls.Box>
              </Controls.Card>
              </>
          ) : (
           
            <>
            <NoDataFound />
            </>
          )}
        </Controls.Grid>
      </Controls.Grid>
    </>
  </ThemeProvider>
    )}
    </>
  );
};
export default DashboardMangement;