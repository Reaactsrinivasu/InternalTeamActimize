import React, { useState } from 'react';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadBirthdayDetailsStart } from '../redux/actions/expertBirthdayActions';
import Pagination from '@mui/material/Pagination';
import { loadUsersStart } from '../redux/actions/UserActions';
import Controls from "../components/Controls";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';
const SquareCard = styled(Controls.Card)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  width: 340,
  height: 300,
  margin: 'auto',
  padding: '16px',
  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
  },
});
const RoundAvatar = styled(Controls.Avatar)({
  marginTop: -10,
  width: 180,
  height: 180,
});
const BirthdaysManagement = () => {
  const dispatch = useDispatch();
  const expertbirthdaydata = useSelector((state) => state.expertsBirthdaysdata?.data?.birthdays || []);
  const totalPages = useSelector((state) => state.expertsBirthdaysdata?.data?.total_pages);
  const [loading, setLoading] = useState(true);
  const handlePageChange = (event, page) => {
    dispatch(loadBirthdayDetailsStart(page));
  };
  useEffect(() => {
    dispatch(loadBirthdayDetailsStart());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
})


  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);
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
      return null; // Return null in case of an error
    }
  };

  const message = expertbirthdaydata?.length > 0 ? true : false

  const PersonCard = ({ name, birthday, imageUrl, decodedImage }) => {
    return (
      <Controls.Grid item xs={12} sm={5} md={4} lg={3}>
        <SquareCard elevation={3} sx={{
          backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',

        }}>
          
          <Controls.Typography variant="subtitle2" component="div" sx={{ marginBottom: "10px", marginTop: "10px" }}>
            Happy Birthday
          </Controls.Typography>
          <RoundAvatar alt={name} src={decodedImage} sx={{ width: 100, height: 100, marginTop: "10px" }} /> {/* Adjust the width and height here */}
          <Controls.CardContent>
            <Controls.Typography variant="subtitle2" component="div">
              {name}
            </Controls.Typography>
            <Controls.Typography variant="subtitle2" component="div">
              {birthday}
            </Controls.Typography>
          </Controls.CardContent>
        </SquareCard>
      </Controls.Grid>
    );
  };
  return (
    <ThemeProvider theme={theme}>
      <>
        <Controls.ReusablePaper sx={{ boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Controls.Typography variant="h2" sx={{ mt: 0 }}>
              Experts Birthday List
            </Controls.Typography>
          </Controls.Box>
        </Controls.ReusablePaper>
        {/* <Controls.Grid container spacing={3} sx={{ overflowX: 'auto', marginLeft: "0%" }}>
          {expertbirthdaydata.map((item, index) => (
            <Controls.Grid item xs={12} sm={6} md={4} key={index}>
              <PersonCard
                name={item.name}
                birthday={item.date_of_birth}
                imageUrl={item.profile_pic}
                decodedImage={decodeProfilePic(item.profile_pic)} />
            </Controls.Grid>
          ))}
      
        </Controls.Grid> */}
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
            <Controls.Grid container sx={{justifyContent: 'center' }}>
              {expertbirthdaydata.map((item, index) => (
                <Controls.Grid item xs={12} md={4} key={index} >
                  <PersonCard
                    name={item.name}
                    birthday={item.date_of_birth}
                    imageUrl={item.profile_pic}
                    decodedImage={decodeProfilePic(item.profile_pic)} />
                </Controls.Grid>
              ))}
            </Controls.Grid>
           
            <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                    <Controls.ReusablePagination
                      onChange={handlePageChange}
                      count={totalPages}  />
                  </Controls.Grid>
            </>
        )}
          </>
        )}
       

      </>
    </ThemeProvider>
  );
};
export default BirthdaysManagement;