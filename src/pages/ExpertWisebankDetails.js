import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loadBankWiseDetailsStart } from '../redux/actions/expertPersonalWiseActions';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Controls from "../components/Controls";
import { ThemeProvider } from '@mui/material/styles';
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
const ExpertWisebankDetails = () => {
  const { id } = useParams(); // Get the expert ID from URL params
  const dispatch = useDispatch();
  const expertfamilywise = useSelector((state) => state.expertbankWiseData?.data?.data || []);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadBankWiseDetailsStart(id));
  }, [dispatch, id]);
  const message = expertfamilywise?.message ? false : true
  return (
    <ThemeProvider theme={theme}>
      {!message ? (
        <>
          <Controls.Box sx={{ marginLeft: "0%" }}>
            <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
              <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                <Controls.Typography variant="h2" sx={{ mt: 0 }}>
                  Bank Details
                </Controls.Typography>
              </Controls.Box>
            </Controls.ReusablePaper>
          </Controls.Box>
          <Controls.Grid container sx={{ display: 'flex', width: '100%', paddingLeft: '0%' }}>
            <Controls.Grid container item md={12} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: theme.palette.customColorOrange.main, padding: '35px 0px', borderRadius: '10px', }} >
              <Controls.Grid item md={8} sx={{ marginRight: '20px' }}>
                <NoDataFound />
              </Controls.Grid>
              <Controls.Grid container item md={3} sx={{ backgroundColor: theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebarheader.backgroundColor, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', padding: '20px 0px', display: 'block', cursor: 'pointer', borderRadius: '10px' }} >
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
            </Controls.Grid>
          </Controls.Grid>
        </>
      ) : (
        <>
          <Controls.Box sx={{ marginLeft: "0%" }}>
            <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
              <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                <Controls.Typography variant="h2" sx={{ mt: 0 }}>
                  Bank Details
                </Controls.Typography>
              </Controls.Box>
            </Controls.ReusablePaper>
          </Controls.Box>
          <Controls.Grid container sx={{ display: 'flex', width: '100%', paddingLeft: '0%' }}>
            <Controls.Grid container item md={12} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: theme.palette.customColorOrange.main, padding: '35px 0px', borderRadius: '10px', }} >
              <Controls.Grid item md={8} sx={{ marginRight: '20px' }}>
                <Controls.Paper sx={{
                  width: '100%', height: '100%', boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', backgroundColor: theme.palette.success.main,
                  borderRadius: '5px', p: 5,
                }}>
                  {expertfamilywise.map((item) => (
                    <>
                      <Controls.Grid container item xs={12} md={8} sx={{ margin: 'auto' }}>
                        <Controls.Grid container item sx={{ justifyContent: 'center', padding: '10px 0px', }}>
                          <Controls.Grid item xs={12} sx={{ display: 'flex', }}>
                            <Controls.Grid item xs={6} sx={{ display: 'flex' }}>
                              <Controls.Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Name Of The Bank</Controls.Typography>
                              <Controls.Typography variant='subtitle1' sx={{ marginLeft: 'auto', fontWeight: 'bold' }}>:</Controls.Typography>

                            </Controls.Grid>
                            <Controls.Grid item xs={6} sx={{ paddingLeft: '30px' }}>
                              <Controls.Typography variant='subtitle2'> {item.bank_name} </Controls.Typography>

                            </Controls.Grid>
                          </Controls.Grid>
                        </Controls.Grid>
                        <Controls.Grid container item sx={{ justifyContent: 'center', padding: '10px 0px', }}>
                          <Controls.Grid item xs={12} sx={{ display: 'flex', }}>
                            <Controls.Grid item xs={6} sx={{ display: 'flex' }}>
                              <Controls.Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Account Number </Controls.Typography>
                              <Controls.Typography variant='subtitle1' sx={{ marginLeft: 'auto', fontWeight: 'bold' }}>:</Controls.Typography>

                            </Controls.Grid>
                            <Controls.Grid item xs={6} sx={{ paddingLeft: '30px' }}>
                              <Controls.Typography variant='subtitle2'> {item.account_number} </Controls.Typography>

                            </Controls.Grid>
                          </Controls.Grid>
                        </Controls.Grid>
                        <Controls.Grid container item sx={{ justifyContent: 'center', padding: '10px 0px', }}>
                          <Controls.Grid item xs={12} sx={{ display: 'flex', }}>
                            <Controls.Grid item xs={6} sx={{ display: 'flex' }}>
                              <Controls.Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>IFSC Code </Controls.Typography>
                              <Controls.Typography variant='subtitle1' sx={{ marginLeft: 'auto', fontWeight: 'bold' }}>:</Controls.Typography>

                            </Controls.Grid>
                            <Controls.Grid item xs={6} sx={{ paddingLeft: '30px' }}>
                              <Controls.Typography variant='subtitle2'>  {item.ifsc_code} </Controls.Typography>

                            </Controls.Grid>
                          </Controls.Grid>
                        </Controls.Grid>
                        <Controls.Grid container item sx={{ justifyContent: 'center', padding: '10px 0px', }}>
                          <Controls.Grid item xs={12} sx={{ display: 'flex', }}>
                            <Controls.Grid item xs={6} sx={{ display: 'flex' }}>
                              <Controls.Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Branch Name </Controls.Typography>
                              <Controls.Typography variant='subtitle1' sx={{ marginLeft: 'auto', fontWeight: 'bold' }}>:</Controls.Typography>

                            </Controls.Grid>
                            <Controls.Grid item xs={6} sx={{ paddingLeft: '30px' }}>
                              <Controls.Typography variant='subtitle2'> {item.branch_name}</Controls.Typography>

                            </Controls.Grid>
                          </Controls.Grid>
                        </Controls.Grid>
                      </Controls.Grid>
                    </>
                  ))}
                </Controls.Paper>
              </Controls.Grid>
              <Controls.Grid item md={3}>
                <Controls.Grid container  sx={{ backgroundColor: theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebarheader.backgroundColor, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', padding: '20px 0px', display: 'block', cursor: 'pointer', borderRadius: '10px' }} >
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
                  <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', backgroundColor: theme.palette.error.main, color: theme.palette.success.main }} onClick={() => navigate(`/hr/experts/expertpage/bankdetails/${id}`)} >
                    <AccountBalanceIcon />
                    <Controls.Typography sx={{ paddingLeft: '10px' }} >Bank Details</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/projects/${id}`)} >
                    <FactCheckIcon />
                    <Controls.Typography sx={{ paddingLeft: '10px' }} >Projects</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/leavebank/${id}`)}>
                    <PersonOffIcon />
                    <Controls.Typography sx={{ paddingLeft: '10px' }} >Leave Bank</Controls.Typography>
                  </Controls.Grid>
                </Controls.Grid>
              </Controls.Grid>
            </Controls.Grid>
          </Controls.Grid>
        </>
      )}

    </ThemeProvider>
  );
};
export default ExpertWisebankDetails;