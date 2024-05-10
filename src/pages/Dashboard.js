import React, { useEffect } from 'react';
import ImageSlider from './ImageSlider';
import HolidaysSlider from './HolidaysSlider';
import ColumnChart from '../dashboardUtils/ColumnChart';
import PieChart from '../dashboardUtils/PieChart';
import { useDispatch } from 'react-redux';
import { loadDashboardDetailsStart } from '../redux/actions/dashboardDetailsActions';
import Controls from "../components/Controls";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(loadDashboardDetailsStart());
  }, []);
  return (
    <ThemeProvider theme={theme}>
    <>
    <Controls.Grid spacing={2} container rowSpacing={2} columnSpacing={3} justifyContent="center">
  <Controls.Grid item xs={12} sm={12} md={8} lg={12} sx={{ boxShadow: '100px rgba(0, 0, 0, 0.1)' }}>
    <ColumnChart />
  </Controls.Grid>
  </Controls.Grid>
  <Controls.Grid spacing={2} container rowSpacing={2} columnSpacing={3} justifyContent="center" sx={{ marginTop: "20px" }}>
  <Controls.Grid item xs={12} sm={6} md={4} lg={4} sx={{ boxShadow: '100px rgba(0, 0, 0, 0.1)' }}>
    <Controls.Card sx={{ borderRadius:'15px' , backgroundColor:  theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor}}>
      <ImageSlider />
    </Controls.Card>
  </Controls.Grid>
  <Controls.Grid item xs={12} sm={6} md={4} lg={4} sx={{ boxShadow: '100px rgba(0, 0, 0, 0.1)' }}>
    <Controls.Card sx={{ borderRadius: '15px', backgroundColor:  theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor,  }}>
      <HolidaysSlider />
    </Controls.Card>
  </Controls.Grid>
  <Controls.Grid item xs={12} sm={12} md={4} lg={4} sx={{ boxShadow: '100px rgba(0, 0, 0, 0.1)' }}>
    <Controls.Card sx={{ borderRadius: '15px', height: "23rem" , backgroundColor:  theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor}}>
      <PieChart sx={{ height: '100%' }} />
    </Controls.Card>
  </Controls.Grid>
</Controls.Grid>


    </>
    </ThemeProvider>
  );
};
export default Dashboard;