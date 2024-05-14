import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllExpertsStart } from '../redux/actions/allExpertsActions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Avatar, Box, Card, CardContent } from '@mui/material';
import Controls from "../components/Controls";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';
const ExpertPage = () => {
  const dispatch = useDispatch();
  const [loading , setLoading] = useState(true);
  const allexperts = useSelector((state) => state.allExpertsData?.data?.users || []);
  const totalPages = useSelector((state) => state.allExpertsData?.data?.total_pages || []);
  const handlePageChange = (event, page) => {
    dispatch(loadAllExpertsStart(page))
  };
  useEffect(() => {
    dispatch(loadAllExpertsStart());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  })

  const navigate = useNavigate();
  const handleCardClick = (expertId) => {
    navigate(`/hr/experts/expertpage/personaldetails/${expertId}`);
  };
  const decodeProfilePic = (base64Image) => {
    if (!base64Image) return null;
    const base64String = base64Image.split(';base64,').pop();
    const cleanedBase64 = base64String.replace(/[^A-Za-z0-9+/]/g, '');
    try {
      const binaryString = window.atob(cleanedBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'image/jpeg' });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error decoding base64 string:', error);
      return null;
    }
  };
  const getAvatarByGender = (expert) => {
    if (expert && expert.gender) {
      if (expert.gender === 'male') {
        // Return male avatar image URL or component
        return 'https://tse3.mm.bing.net/th?id=OIP.kMQ14gs4OXX7BqCaoqruOQHaHa&pid=Api&P=0&h=180';
      } else if (expert.gender === 'female') {
        // Return female avatar image URL or component
        return 'https://tse3.mm.bing.net/th?id=OIP.8DOYmYeEcbo8JW_rtmkz1wHaHa&pid=Api&P=0&h=180';
      }
    }
    return 'URL_OR_COMPONENT_FOR_DEFAULT_AVATAR';
  };
  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
            {allexperts?.length > 0 ? (
         <>
         <Controls.Container>
           <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
             <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
               <Controls.Typography variant="h2" sx={{ mt: 0 }}>
                 Experts Page
               </Controls.Typography>
             </Controls.Box>
           </Controls.ReusablePaper>
           <Controls.Grid container spacing={3}>
   
             {allexperts.map((expert, index) => (
               <Grid item xs={12} md={4} >
                 <Card sx={{
                   display: 'flex', padding: '20px', cursor:'pointer', backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor,
                   '&:hover': {
                     transition: 'transform 0.5s ease-in-out',
                     transform: 'scale(0.9)',
                     boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                   },
                 }} onClick={() => handleCardClick(expert.id)}>
   
   
                   <Avatar
                     alt="Remy Sharp"
                     src={expert.profile_pic ? decodeProfilePic(expert.profile_pic) : getAvatarByGender(expert)}
                     sx={{ width: 120, height: 120 }}
                   />
                   <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', }}>
   
                     <CardContent sx={{ flex: '1 0 auto', padding: '20px', }}>
                       <Typography variant='h6' sx={{ fontSize: '18px', fontWeight: "bold", }}> {expert.name}</Typography>
                       <Typography variant='subtitle2' sx={{ fontSize: '15px', }}>{expert.designation}</Typography>
                       <Typography variant='subtitle2' sx={{ fontSize: '15px', }}>{expert.email}</Typography>
                     </CardContent>
                   </Box>
   
   
                 </Card>
               </Grid>
             ))}
   
             <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
               <Controls.ReusablePagination onChange={handlePageChange} count={totalPages}  />
             </Controls.Grid>
           </Controls.Grid>
   
   
         </Controls.Container>
         </>
       
      ) : (
        <>
        <NoDataFound />
        </>
      )}
        </>
      )}
  

    </ThemeProvider>
  );
};
export default ExpertPage;