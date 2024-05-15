import React, { useState } from 'react'
import { useEffect } from 'react'
import Controls from "../components/Controls";
import { useSelector, useDispatch } from 'react-redux';
import { loadLeaveBankWiseDetailsStart } from '../redux/actions/expertPersonalWiseActions';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { Divider } from '@mui/material';
import theme from "../Theme";
import ContactEmergencyRoundedIcon from '@mui/icons-material/ContactEmergencyRounded';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ContactsIcon from '@mui/icons-material/Contacts';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';
const ExpertWiseLeaveBank = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const expertfamilywise = useSelector((state) => state.expertleavebankwiseData);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadLeaveBankWiseDetailsStart(id));
  }, [dispatch, id]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  })
  const message = expertfamilywise?.data?.data?.message ? false : true
  return (
    <ThemeProvider theme={theme}>
      <>
        <Controls.Box sx={{ marginLeft: "0%" }}>
          <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
              <Controls.Typography variant="h2" sx={{ mt: 0 }}>
                Expert  Leave Bank
              </Controls.Typography>
            </Controls.Box>
          </Controls.ReusablePaper>
        </Controls.Box>
        <Controls.Grid container sx={{ display: 'flex', width: '100%', paddingLeft: '0%' }}>
          <Controls.Grid container item md={12} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor, padding: '35px 0px', borderRadius: '10px', }} >
            <Controls.Grid item md={8} sx={{ marginRight: '20px' }}>
              {loading ? (
                <LoadingComponent />
              ) : (
                <>
                 { !message  ? (
                
                <>
                <NoDataFound />
                </>
             ) : (
               <>
               <Controls.Grid container xs={12}>
                 <Controls.Grid item xs={12} md={4} sx={{ padding: '0px 5px' }}>
                   <Controls.Paper sx={{
                     padding: '10px', borderRadius: '10px', backgroundColor: theme.palette.success.main,
                     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                     transition: 'box-shadow 0.3s ease',
                     '&:hover': {
                       boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                     },
                   }}>
                     <Controls.Typography variant='h6' sx={{ padding: '5px 0px', textAlign: 'center', }}>Total Leaves</Controls.Typography>
                     <Divider sx={{ backgroundColor: theme.palette.error.main }} />
 
                     <Controls.Grid sx={{ display: 'flex', margin: '10px 0px' }}>
                       <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Total No of Leaves </Controls.Typography>
                       <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{expertfamilywise?.data?.data[0]?.casual_leaves}</Controls.Typography>
                     </Controls.Grid>
                     <Controls.Grid sx={{ display: 'flex', marginBottom: '10px' }}>
                       <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Casual Leaves </Controls.Typography>
                       <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{expertfamilywise?.data?.data[0]?.casual_leaves} </Controls.Typography>
                     </Controls.Grid>
                     <Controls.Grid sx={{ display: 'flex', marginBottom: '10px' }}>
                       <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Sick Leaves</Controls.Typography>
                       <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{expertfamilywise?.data?.data[0]?.sick_leaves} </Controls.Typography>
                     </Controls.Grid>
                   </Controls.Paper>
                 </Controls.Grid>
                 <Controls.Grid item xs={12} md={4} sx={{ padding: '0px 5px', }}>
                   <Controls.Paper sx={{
                     padding: '10px 10px 40px 10px', borderRadius: '10px', backgroundColor: theme.palette.success.main,
                     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                     transition: 'box-shadow 0.3s ease',
                     '&:hover': {
                       boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                     },
                   }}>
                     <Controls.Typography variant='h6' sx={{ padding: '5px 0px', textAlign: 'center', }}>Total Taken Leaves</Controls.Typography>
                     <Divider sx={{ backgroundColor: theme.palette.error.main }} />
                     <Controls.Grid sx={{ display: 'flex', margin: '10px 0px' }}>
                       <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Taken Casual Leaves  </Controls.Typography>
                       <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{expertfamilywise?.data?.data[0]?.taken_casual_leaves} </Controls.Typography>
                     </Controls.Grid>
                     <Controls.Grid sx={{ display: 'flex', marginBottom: '10px' }}>
                       <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Taken Sick Leaves </Controls.Typography>
                       <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{expertfamilywise?.data?.data[0]?.taken_sick_leaves} </Controls.Typography>
                     </Controls.Grid>
                   </Controls.Paper>
                 </Controls.Grid>
                 <Controls.Grid item xs={12} md={4} sx={{ padding: '0px 5px' }}>
                   <Controls.Paper sx={{
                     padding: '10px 10px 40px 10px', borderRadius: '10px', backgroundColor: theme.palette.success.main,
                     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                     transition: 'box-shadow 0.3s ease',
                     '&:hover': {
                       boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                     },
                   }}>
 
                     <Controls.Typography variant='h6' sx={{ padding: '5px 0px', textAlign: 'center', }}>Total Remaining Leaves</Controls.Typography>
                     <Divider sx={{ backgroundColor: theme.palette.error.main }} />
                     <Controls.Grid sx={{ display: 'flex', margin: '10px 0px' }}>
                       <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Remaining Sick Leaves   </Controls.Typography>
                       <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{expertfamilywise?.data?.data[0]?.remaining_sick_leaves} </Controls.Typography>
                     </Controls.Grid>
                     <Controls.Grid sx={{ display: 'flex', marginBottom: '10px' }}>
                       <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Remaining Casual Leaves  </Controls.Typography>
                       <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{expertfamilywise?.data?.data[0]?.remaining_casual_leaves} </Controls.Typography>
                     </Controls.Grid>
                   </Controls.Paper>
                 </Controls.Grid>
               </Controls.Grid>
               </>
             )}
                </>
              )}
             
            </Controls.Grid>

            <Controls.Grid container item md={3} sx={{ backgroundColor: theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebarheader.backgroundColor, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', padding: '20px 0px', display: 'block', cursor: 'pointer', borderRadius: '10px' }} >
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/emergencydetails/${id}`)} >
                <ContactEmergencyRoundedIcon />
                <Controls.Typography sx={{ paddingLeft: '10px' }} >Emergency Details</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/familydetails/${id}`)} >
                <Diversity1RoundedIcon />
                <Controls.Typography sx={{ paddingLeft: '10px' }} >Family Details</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/skills/${id}`)} >
                <PsychologyIcon />
                <Controls.Typography sx={{ paddingLeft: '10px' }} >Skills</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/workexperience/${id}`)} >
                <WorkHistoryIcon />
                <Controls.Typography sx={{ paddingLeft: '10px' }}>Work Experience</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/personaldetails/${id}`)} >
                <ContactsIcon />
                <Controls.Typography sx={{ paddingLeft: '10px' }} >Personal Details</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/bankdetails/${id}`)} >
                <AccountBalanceIcon />
                <Controls.Typography sx={{ paddingLeft: '10px' }} >Bank Details</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/projects/${id}`)} >
                <FactCheckIcon />
                <Controls.Typography sx={{ paddingLeft: '10px' }} >Projects</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', backgroundColor: theme.palette.error.main, color: theme.palette.success.main }} onClick={() => navigate(`/hr/experts/expertpage/leavebank/${id}`)}>
                <PersonOffIcon />
                <Controls.Typography sx={{ paddingLeft: '10px' }} >Leave Bank</Controls.Typography>
              </Controls.Grid>
            </Controls.Grid>


          </Controls.Grid>
        </Controls.Grid>




      </>
    </ThemeProvider>
  );
};
export default ExpertWiseLeaveBank;