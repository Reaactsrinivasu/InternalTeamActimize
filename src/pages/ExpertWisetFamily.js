import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loadFamilyWiseDetailsStart } from '../redux/actions/expertPersonalWiseActions';
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
import Modal from '@mui/material/Modal';
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';
const ExpertWisetFamily = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading , setLoading] = useState(true);
  const expertfamilywise = useSelector((state) => state.expertfimlywiseData?.data?.data || []);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadFamilyWiseDetailsStart(id));
  }, [dispatch, id]);

  useState(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200)
  })
  const [open, setOpen] = useState(false);
  const [indexValue, setIndexValue] = useState(null);
  const handleOpen = (value) => {
    setIndexValue(value);
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = Array.isArray(expertfamilywise) ? expertfamilywise.slice(startIndex, endIndex) : [];
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const message = expertfamilywise?.length > 0 ? true : false
  return (
    <ThemeProvider theme={theme}>
      <>
        <Controls.Box sx={{ marginLeft: "0%" }}>
          <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
              <Controls.Typography variant="h2" sx={{ mt: 0 }}>
                Family Details
              </Controls.Typography>
            </Controls.Box>
          </Controls.ReusablePaper>
        </Controls.Box>
        <Controls.Grid container sx={{ display: 'flex', width: '100%', paddingLeft: '0%' }}>
          <Controls.Grid container item md={12} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor, padding: '35px 0px', borderRadius: '10px', }} >
            <Controls.Grid item md={8} sx={{ marginRight: '20px', }}>
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
                 {currentData.map((item, index) => (
                   <>
                     <Controls.Grid item xs={5} sx={{
                       backgroundColor: theme.palette.success.main, borderRadius: '10px', margin: '25px 25px 0px 0px', padding: '5px',
                       boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',cursor:'pointer',
                       transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', '&:hover': {
                         transform: 'scale(1.1)',
                         boxShadow: '0 0 20px rgba(0, 0, 0, 0.7)'
                       }
                     }} onClick={() => handleOpen(index)}>
                       <Controls.Grid container sx={{ padding: '15px 20px', display: 'flex', }}>
                         <Controls.Grid item xs={5} sx={{ display: 'flex' }}>
                           <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Name</Controls.Typography>
                           <Controls.Typography variant='h5' sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>:</Controls.Typography>
                         </Controls.Grid>
                         <Controls.Grid item xs={7} sx={{ paddingLeft: '30px' }}>
                           <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{item.name}</Controls.Typography>
                         </Controls.Grid>
                       </Controls.Grid>
                       <Controls.Grid container sx={{ padding: '15px 20px', display: 'flex', }}>
                         <Controls.Grid item xs={5} sx={{ display: 'flex' }}>
                           <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Relationship</Controls.Typography>
                           <Controls.Typography variant='h5' sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>:</Controls.Typography>
                         </Controls.Grid>
                         <Controls.Grid item xs={7} sx={{ paddingLeft: '30px' }}>
                           <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{item.relationship}</Controls.Typography>
                         </Controls.Grid>
                       </Controls.Grid>
                     </Controls.Grid>
                   </>
                 ))}
                 <Modal
                   open={open}
                   onClick={handleClose}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description"
                 >
                   <Controls.Grid container sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, }} >
 
                     {currentData.map((item, index) => (
                       <>
                         {indexValue === index ? (<Controls.Grid item xs={12} md={12} sx={{
                           backgroundColor: theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebarheader.backgroundColor,
                           marginRight: '10px', 
                           boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '15px',
                           transition: 'box-shadow 0.3s ease',
                           '&:hover': {
                             boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                           },
                         }} >
 
                           <Controls.Grid container sx={{ padding: '15px 20px', display: 'flex', }}>
                             <Controls.Grid item xs={5} sx={{ display: 'flex' }}>
                               <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Name</Controls.Typography>
                               <Controls.Typography variant='h5' sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>:</Controls.Typography>
                             </Controls.Grid>
                             <Controls.Grid item xs={7} sx={{ paddingLeft: '30px' }}>
                               <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{item.name}</Controls.Typography>
                             </Controls.Grid>
                           </Controls.Grid>
                           <Controls.Grid container sx={{ padding: '15px 20px', display: 'flex' }}>
                             <Controls.Grid item xs={5} sx={{ display: 'flex' }}>
                               <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Email </Controls.Typography>
                               <Controls.Typography variant='h5' sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>:</Controls.Typography>
                             </Controls.Grid>
                             <Controls.Grid item xs={7} sx={{ paddingLeft: '30px' }}>
                               <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{item.email}</Controls.Typography>
                             </Controls.Grid>
                           </Controls.Grid>
                           <Controls.Grid container sx={{ padding: '15px 20px', display: 'flex' }}>
                             <Controls.Grid item xs={5} sx={{ display: 'flex' }}>
                               <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Address </Controls.Typography>
                               <Controls.Typography variant='h5' sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>:</Controls.Typography>
                             </Controls.Grid>
                             <Controls.Grid item xs={7} sx={{ paddingLeft: '30px' }}>
                               <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{item.address}</Controls.Typography>
                             </Controls.Grid>
                           </Controls.Grid>
                           <Controls.Grid container sx={{ padding: '15px 20px', display: 'flex' }}>
                             <Controls.Grid item xs={5} sx={{ display: 'flex' }}>
                               <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Relationship</Controls.Typography>
                               <Controls.Typography variant='h5' sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>:</Controls.Typography>
                             </Controls.Grid>
                             <Controls.Grid item xs={7} sx={{ paddingLeft: '30px' }}>
                               <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{item.relationship}</Controls.Typography>
                             </Controls.Grid>
                           </Controls.Grid>
                           <Controls.Grid container sx={{ padding: '15px 20px', display: 'flex' }}>
                             <Controls.Grid item xs={5} sx={{ display: 'flex' }}>
                               <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Mobile Number</Controls.Typography>
                               <Controls.Typography variant='h5' sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>:</Controls.Typography>
                             </Controls.Grid>
                             <Controls.Grid item xs={7} sx={{ paddingLeft: '30px' }}>
                               <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{item.mobile_number} </Controls.Typography>
                             </Controls.Grid>
                           </Controls.Grid>
 
                         </Controls.Grid>) : ('')}
 
                       </>
                     ))}
                   </Controls.Grid>
                 </Modal>
               </Controls.Grid>
               <Controls.Grid container sx={{ marginTop: '30px', justifyContent: 'center', bottom:0 }}>
                 <Controls.ReusablePagination count={Math.ceil(expertfamilywise.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} />
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
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', backgroundColor: theme.palette.error.main, color: theme.palette.success.main }} onClick={() => navigate(`/hr/experts/expertpage/familydetails/${id}`)} >
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
export default ExpertWisetFamily; 