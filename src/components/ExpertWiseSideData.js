import React from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";



const ExportWiseSideData = () => {
    const { id } = useParams();
    return(
        <ThemeProvider theme={}>
        <>
        
        <Controls.Grid container  sx={{ backgroundColor: theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebarheader.backgroundColor, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', padding: '20px 0px', display: 'block', cursor: 'pointer', borderRadius: '10px' }} >
                  <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.customColorOrange.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/emergencydetails/${id}`)} >
                    <ContactEmergencyRoundedIcon />
                    <Controls.Typography sx={{ paddingLeft: '10px' }} >Emergency Details</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.customColorOrange.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/familydetails/${id}`)} >
                    <Diversity1RoundedIcon />
                    <Controls.Typography sx={{ paddingLeft: '10px' }} >Family Details</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.customColorOrange.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/skills/${id}`)} >
                    <PsychologyIcon />
                    <Controls.Typography sx={{ paddingLeft: '10px' }} >Skills</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.customColorOrange.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/workexperience/${id}`)} >
                    <WorkHistoryIcon />
                    <Controls.Typography sx={{ paddingLeft: '10px' }}>Work Experience</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.customColorOrange.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/personaldetails/${id}`)} >
                    <ContactsIcon />
                    <Controls.Typography sx={{ paddingLeft: '10px' }} >Personal Details</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor, color: theme.palette.success.main }} onClick={() => navigate(`/hr/experts/expertpage/bankdetails/${id}`)} >
                    <AccountBalanceIcon />
                    <Controls.Typography sx={{ paddingLeft: '10px' }} >Bank Details</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.customColorOrange.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/projects/${id}`)} >
                    <FactCheckIcon />
                    <Controls.Typography sx={{ paddingLeft: '10px' }} >Projects</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.customColorOrange.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/leavebank/${id}`)}>
                    <PersonOffIcon />
                    <Controls.Typography sx={{ paddingLeft: '10px' }} >Leave Bank</Controls.Typography>
                  </Controls.Grid>
                </Controls.Grid>
        </>
        </ThemeProvider>
    )
}

export default ExportWiseSideData;