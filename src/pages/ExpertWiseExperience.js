import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loadWorkExperienceWiseDetailsStart } from '../redux/actions/expertPersonalWiseActions';
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
import LoadingComponent from '../components/LoadingComponent';
const ExpertWiseExperience = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading , setLoading] = useState(true);
  const expertWorkExperienceWise = useSelector((state) => state.expertWorkExperienceWiseData?.data?.data || []);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadWorkExperienceWiseDetailsStart(id));
  }, [dispatch, id]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 200);
  })


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = Array.isArray(expertWorkExperienceWise) ? expertWorkExperienceWise.slice(startIndex, endIndex) : [];
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const message = expertWorkExperienceWise?.length > 0 ? true : false 
  return (
    <ThemeProvider theme={theme}>
      <>
        <Controls.Box sx={{ marginLeft: "0%" }}>
          <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
              <Controls.Typography variant="h2" sx={{ mt: 0 }}>
                Work Experience
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
                 {!message ? (
                
                <>
                <NoDataFound />
                </>
             ) : (
               <>
               <Controls.Grid container item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                 {currentData.map((item) => (
                   <>
                     <Controls.Grid item xs={12} md={5.5} sx={{
                       marginRight: '10px', backgroundColor: theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebarheader.backgroundColor,
                       boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '15px',
                       transition: 'box-shadow 0.3s ease',
                       '&:hover': {
                         boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                       },
                     }} >
                       <Controls.Grid container sx={{ padding: '15px 20px', display: 'flex', }}>
                         <Controls.Grid item xs={6} sx={{ display: 'flex' }}>
                           <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Organization Name</Controls.Typography>
                           <Controls.Typography variant='h5' sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>:</Controls.Typography>
                         </Controls.Grid>
                         <Controls.Grid item xs={6} sx={{ paddingLeft: '30px' }}>
                           <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{item.organization_name}</Controls.Typography>
                         </Controls.Grid>
                       </Controls.Grid>
                       <Controls.Grid container sx={{ padding: '15px 20px', display: 'flex' }}>
                         <Controls.Grid item xs={6} sx={{ display: 'flex' }}>
                           <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Date of Joining  </Controls.Typography>
                           <Controls.Typography variant='h5' sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>:</Controls.Typography>
                         </Controls.Grid>
                         <Controls.Grid item xs={6} sx={{ paddingLeft: '30px' }}>
                           <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{item.date_of_join}</Controls.Typography>
                         </Controls.Grid>
                       </Controls.Grid>
                       <Controls.Grid container sx={{ padding: '15px 20px', display: 'flex' }}>
                         <Controls.Grid item xs={6} sx={{ display: 'flex' }}>
                           <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Date of End  </Controls.Typography>
                           <Controls.Typography variant='h5' sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>:</Controls.Typography>
                         </Controls.Grid>
                         <Controls.Grid item xs={6} sx={{ paddingLeft: '30px' }}>
                           <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{item.date_of_end}</Controls.Typography>
                         </Controls.Grid>
                       </Controls.Grid>
                       <Controls.Grid container sx={{ padding: '15px 20px', display: 'flex' }}>
                         <Controls.Grid item xs={6} sx={{ display: 'flex' }}>
                           <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Designation</Controls.Typography>
                           <Controls.Typography variant='h5' sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>:</Controls.Typography>
                         </Controls.Grid>
                         <Controls.Grid item xs={6} sx={{ paddingLeft: '30px' }}>
                           <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{item.designation}</Controls.Typography>
                         </Controls.Grid>
                       </Controls.Grid>
                     </Controls.Grid>
                   </>
                 ))}
               </Controls.Grid>
               <Controls.Grid container sx={{ marginTop: '30px', justifyContent: 'center', }}>
                 <Controls.ReusablePagination count={Math.ceil(expertWorkExperienceWise.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} />
               </Controls.Grid>
               </>
             )}
                </>
              )}
             
            </Controls.Grid>
            <Controls.Grid container item md={3} sx={{ backgroundColor: theme.palette.success.main, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', padding: '20px 0px', display: 'block', cursor: 'pointer', borderRadius: '10px' }} >
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
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', backgroundColor: theme.palette.error.main, color: theme.palette.success.main }} onClick={() => navigate(`/hr/experts/expertpage/workexperience/${id}`)} >
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
export default ExpertWiseExperience;