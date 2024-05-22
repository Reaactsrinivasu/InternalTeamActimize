import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loadSkillsWiseDetailsStart } from '../redux/actions/expertPersonalWiseActions';
import Controls from "../components/Controls";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
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
import StarIcon from '@mui/icons-material/Star';
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';
const ExpertWiseSkills = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const expertSkillwise = useSelector((state) => state.expertSkillWiseData?.data?.data || []);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadSkillsWiseDetailsStart(id));
  }, [dispatch, id]);

  useEffect( () => {
    setTimeout(() => {
        setLoading(false);
    }, 900);
  })

  const message = expertSkillwise?.length > 0 ? true : false
  return (
    <ThemeProvider theme={theme}>
      <>
        <Controls.Box sx={{ marginLeft: "0%" }}>
          <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
              <Controls.Typography variant="h2" sx={{ mt: 0 }}>
                Expert Skills
              </Controls.Typography>
            </Controls.Box>
          </Controls.ReusablePaper>
        </Controls.Box>

        <Controls.Grid container sx={{ display: 'flex', paddingLeft: '0%', }}>

          <Controls.Grid container item md={12} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor, padding: '35px 0px', borderRadius: '10px' }} >
            <Controls.Grid item md={8} sx={{ marginRight: '20px' }}>

          {loading ? (
            <LoadingComponent />
          ) : (
            <>
            {!message? (
               
               <>
               <NoDataFound />
               </>
            ) : (
              <>
              <Controls.Grid container xs={8} sx={{
                backgroundColor: theme.palette.success.main, color: theme.palette.error.main,
                justifyContent: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px',
                transition: 'box-shadow 0.3s ease', margin: 'auto',
                '&:hover': {
                  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                },
              }}>
                <Controls.Grid item xs={12} sx={{ display: 'flex', padding: '5px', borderBottom: '2px solid', borderColor: theme.palette.error.main, }}>
                  <Controls.Grid item xs={6} sx={{ textAlign: 'center', padding: '5px 0px' }}>
                    <Controls.Typography sx={{ fontWeight: 'bold' }}>Skills</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid item xs={6} sx={{ textAlign: 'center', padding: '5px 0px' }}>
                    <Controls.Typography sx={{ fontWeight: 'bold' }}>Rating</Controls.Typography>
                  </Controls.Grid>
                </Controls.Grid>
                <Controls.Grid container sx={{
                  overflowY: 'scroll', maxHeight: '240px', '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.error.main,
                    borderRadius: '10px',
                  },
                }}>
                  {expertSkillwise.map((item) => (
                    <>
                      <Controls.Grid item xs={12} sx={{ display: 'flex', padding: '10px 0px', }}>
                        <Controls.Grid item xs={6} sx={{ textAlign: 'center' }}>
                          <Controls.Typography variant='h7'  >{item.skill_name}</Controls.Typography>
                        </Controls.Grid>

                        <Controls.Grid item xs={6} sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                          <Controls.Typography variant='h7' sx={{ marginRight: '5px' }}>{item.rating} </Controls.Typography>
                          <StarIcon sx={{ fontSize: '15px' }} />
                        </Controls.Grid>
                      </Controls.Grid>

                    </>
                  ))}
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
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', backgroundColor: theme.palette.error.main, color: theme.palette.success.main }} onClick={() => navigate(`/hr/experts/expertpage/skills/${id}`)} >
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
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/leavebank/${id}`)}>
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
export default ExpertWiseSkills;