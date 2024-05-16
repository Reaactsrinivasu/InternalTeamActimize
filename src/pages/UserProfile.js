import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUsersStart } from '../redux/actions/UserActions';
import { useNavigate } from "react-router-dom";
import * as dayjs from 'dayjs';
import Controls from "../components/Controls";
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider from Material-UI
import theme from "../Theme"; // Import your theme file
const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.data.data);
  const [decodedProfilePic, setDecodedProfilePic] = useState('');
  useEffect(() => {
    if (users && users.profile_pic) {
      const base64Image = users.profile_pic;
      const base64String = base64Image.split(';base64,').pop();
      const cleanedBase64 = base64String.replace(/[^A-Za-z0-9+/]/g, '');
      try {
        const binaryString = window.atob(cleanedBase64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
        setDecodedProfilePic(imageUrl);
      } catch (error) {
      }
    }
  }, [users]);
  useEffect(() => {
    dispatch(loadUsersStart());
  }, [])
  return (

    <>
      <Controls.Box sx={{ marginLeft: "11%" }}>
        <Controls.ReusablePaper elevation={1}>
          <Controls.Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Controls.Typography variant="h2" sx={{ mt: 0 }}>
              User Profile
            </Controls.Typography>
          </Controls.Box>
        </Controls.ReusablePaper>
      </Controls.Box>
      <Controls.Grid container sx={{justifyContent:'end'}}>
        <Controls.Grid xs={1.2} sx={{}}>

        </Controls.Grid>
        <Controls.Grid rowSpacing={3} columnSpacing={3} item xs={10.8} container p={1} sx={{
          // "&.MuiGrid-root": {
          //   paddingLeft: "11.7%",
          // },
        }}>
          <Controls.Grid item xs={12} sm={12} md={3} >
            <Controls.Paper maxWidth="xlg" sx={{ width: '100%', height: '100%', boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor, borderRadius: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 4 }}>
              <Controls.Avatar
                sx={{ width: 140, height: 140 }}
                alt="Profile Pic"
                src={decodedProfilePic} />
              <Controls.Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                {users?.first_name} {users?.last_name}
              </Controls.Typography>
              <Controls.Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center' }}> {users?.permanent_address}
              </Controls.Typography>
            </Controls.Paper>
          </Controls.Grid>
          <Controls.Grid item xs={12} sm={12} md={9}>
            <Controls.Paper maxWidth="xlg" sx={{ width: '100%', height: '100%', backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '5px', p: 5 }}>
              <Controls.Grid rowSpacing={3} columnSpacing={3} container>
                <Controls.Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 2 }}>
                  <Controls.Typography component="span" variant='h1' sx={{ ml: 3, }}>Profile</Controls.Typography>
                  <Controls.ReusableButton
                    onClick={() => navigate('/emp/profiles/personaldetails')}
                    bgcolor={theme.components.MuiButton.styleOverrides.containedAddButton}
                    buttonVariant="contained"
                    buttonText="Add" />
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={12} md={12} >
                  <Controls.Divider />
                  {/* <Controls.Typography
                  variant="subtitle1" sx={{ mt: 1, ml: 3, }}>Hi, this is  {users?.first_name} {users?.last_name} , working as a software developer in Actimize,it is the best company around  and The information can be edited...</Controls.Typography> */}
                  <Controls.Typography
                    variant="h6" sx={{ mt: 1, ml: 3, }}>{users?.bio}</Controls.Typography>
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={4} md={4} sx={{ width: '100%', height: '100%', }}>
                  <Controls.Box component="span" sx={{ ml: 3, mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Controls.EmailTwoToneIcon sx={{ width: '25px', height: '25px', color: theme.palette.error.main }} />

                    <Controls.Typography variant="h6" sx={{ ml: 1, }}>
                      {users?.personal_email}
                    </Controls.Typography>
                  </Controls.Box>
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={4} md={4} sx={{ width: '100%', height: '100%', }}>
                  <Controls.Box component="span" sx={{ ml: 3, mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Controls.PhonelinkRingTwoToneIcon sx={{ width: '25px', height: '25px', color: theme.palette.error.main }} />
                    <Controls.Typography variant="h6" sx={{ ml: 1, }}>
                      {users?.mobile_number}
                    </Controls.Typography>
                  </Controls.Box>
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={4} md={4} sx={{ width: '100%', height: '100%', }}>
                  <Controls.Box component="span" sx={{ ml: 3, mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Controls.PinDropTwoToneIcon sx={{ width: '25px', height: '25px', color: theme.palette.error.main }} />
                    <Controls.Typography variant="h6" sx={{
                      ml: 1,
                      // overflow: 'auto',
                      // whiteSpace: 'nowrap',
                      '&::-webkit-scrollbar': {
                        width: '5px',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '5px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: '15px',
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                      },
                    }}>
                      {users?.present_address}
                    </Controls.Typography>
                  </Controls.Box>
                </Controls.Grid>
              </Controls.Grid>
            </Controls.Paper>
          </Controls.Grid>

        </Controls.Grid>
      </Controls.Grid>
      <Controls.Grid container sx={{ justifyContent: 'end'}}>
        <Controls.Grid rowSpacing={3} columnSpacing={3} item xs={10.8} container p={1} sx={{
          // "&.MuiGrid-root": {
          //   paddingLeft: "11.7%",
          // },
        }}>
          <Controls.Grid item xs={12} sm={12} md={6} >
            <Controls.Paper maxWidth="xlg" sx={{ width: '100%', height: '100%', boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor, borderRadius: '5px', p: 5 }}>
              <Controls.Grid rowSpacing={3} columnSpacing={3} container>
                <Controls.Grid item xs={12} sm={12} md={12} sx={{ width: '100%', height: '100%', }}>
                  <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Controls.Typography variant="subtitle1"
                    >Gender</Controls.Typography>
                    <Controls.Typography variant="subtitle2" >{users?.gender}</Controls.Typography>
                  </Controls.Box>
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={12} md={12} sx={{ width: '100%', height: '100%', }}>
                  <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Controls.Typography variant="subtitle1" >Date of Birth</Controls.Typography>
                    <Controls.Typography variant="subtitle2">
                      {users?.date_of_birth ? dayjs(users.date_of_birth).format('DD-MM-YYYY') : ''}
                    </Controls.Typography>
                  </Controls.Box>
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={12} md={12} sx={{ width: '100%', height: '100%', }}>
                  <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Controls.Typography variant="subtitle1" >Martial Status</Controls.Typography>
                    <Controls.Typography variant="subtitle2">{users?.marital_status}</Controls.Typography>
                  </Controls.Box>
                </Controls.Grid>
              </Controls.Grid>
            </Controls.Paper>
          </Controls.Grid>
          <Controls.Grid item xs={12} sm={12} md={6} >
            <Controls.Paper maxWidth="xlg" sx={{ width: '100%', height: '100%', boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor, borderRadius: '5px', p: 5 }}>
              <Controls.Grid rowSpacing={3} columnSpacing={3} container>
                <Controls.Grid item xs={12} sm={12} md={12} sx={{ width: '100%', height: '100%', }}>
                  <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Controls.Typography variant="subtitle1" >Aadhar Card</Controls.Typography>
                    <Controls.Typography variant="subtitle2">{users?.aadhar_card_number}</Controls.Typography>
                  </Controls.Box>
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={12} md={12} sx={{ width: '100%', height: '100%', }}>
                  <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Controls.Typography variant="subtitle1" >Pan Card</Controls.Typography>
                    <Controls.Typography variant="subtitle2">{users?.pan_card_number}</Controls.Typography>
                  </Controls.Box>
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={12} md={12} sx={{ width: '100%', height: '100%', }}>
                  <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Controls.Typography variant="subtitle1">Nationality</Controls.Typography>
                    <Controls.Typography variant="subtitle2">{users?.nationality}</Controls.Typography>
                  </Controls.Box>
                </Controls.Grid>
              </Controls.Grid>
            </Controls.Paper>
          </Controls.Grid>
        </Controls.Grid>

      </Controls.Grid>
    </>
  )
}
export default UserProfile;


