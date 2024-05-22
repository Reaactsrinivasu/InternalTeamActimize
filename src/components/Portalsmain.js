import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Controls from './Controls';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { generateToken } from '../firebase';
import { userTokenStart } from '../redux/actions/userTokenActions';
import { useDispatch } from 'react-redux';
// import theme from "../Theme";
import theme from '../Theme';
import { loadUserProfileDetailsStart } from '../redux/actions/userProfileDataActions';
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const mdTheme = createTheme();

const Portalsmain = () => {
    const { state } = useLocation();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [decodedProfilePic, setDecodedProfilePic] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    
    useEffect(() => {
        dispatch(loadUserProfileDetailsStart());
    }, [dispatch]);
    const users = useSelector((state) => state.userprofiledetailsdata?.data?.current_user || []);


    useEffect(() => {
        const storedData = localStorage.getItem('data');
        const parsedData = storedData ? JSON.parse(storedData) : null;
        setUserData(parsedData);
        const isEmployee = parsedData?.includes('Employee');
        const isManagement = parsedData?.includes('Management');
        if (isEmployee || isManagement) {
            setOpen(true);
        }
    }, []);
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
                console.error('Error decoding base64 string:', error);
            }
        }
    }, [users]);

    useEffect(() => {
        handleGetFirebaseToken();
    }, []);

    const handleGetFirebaseToken = async () => {
        const generatedToken = await generateToken();
  
        dispatch(userTokenStart(generatedToken));
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleEmployeeClick = () => {
        navigate('/emp')
    };

    const handleManagementClick = () => {
        navigate('/hr')
    };
    

    return (
        <ThemeProvider theme={theme}>
        <>
                <Controls.Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Controls.AppBar sx={{
                   backgroundColor: theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebarheader.backgroundColor,
                     display: 'flex',
                }} >
                            <Controls.Toolbar sx={{ pr: '24px' }}>
                                <Controls.Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    sx={{ flexGrow: 1 }}>
                                </Controls.Typography>
                                <Controls.Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Controls.Typography variant="h3"sx={{ mt: 1,  mr: 3 }}>
                                        {users?.name} 
                                    </Controls.Typography>
                                    <Controls.Avatar alt="Remy Sharp" src={decodedProfilePic} onClick={handleClick} />
                                    <Controls.Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        PaperProps={{ style: { backgroundColor: theme.palette.customColorOrange.main, } }} >
                                        <Controls.MenuItem onClick={() => {
                                            localStorage.removeItem('token');
                                            window.location.reload(false);
                                        }}sx={{    color: theme.palette.error.main,}}>
                                            <Controls.Grid sx={{alignItems:'center', display:'flex'}}>
                                                <PowerSettingsNewIcon sx={{marginRight:'5px', fontSize:'17px'}} />
                                                <Controls.Typography variant='h6'>Logout</Controls.Typography>
                                            </Controls.Grid>
                                            
                                        </Controls.MenuItem>
                                    </Controls.Menu>
                                </Controls.Stack>
                            </Controls.Toolbar>
                        </Controls.AppBar>
                    </Controls.Box>
             
            {/* </ThemeProvider> */}
            {open && (
                <Controls.Grid container spacing={2} justifyContent="center" sx={{ marginTop: 20 }}>
                    {userData.includes('Employee') && !userData.includes('Management') && (
                        <Controls.Grid item xs={12} sm={6} md={5} lg={5}>
                            <Controls.Paper elevation={10} style={{ padding: 26 }}>
                                <Controls.Card
                                    onClick={handleEmployeeClick}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        backgroundImage: 'url("https://www.shutterstock.com/image-vector/group-portrait-funny-smiling-office-260nw-1249852108.jpg")',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        minHeight: '250px', // Set your desired height
                                        cursor: 'pointer', // Add cursor property
                                        transition: 'transform 0.2s ease-in-out', // Add transition for a smooth effect
                                        '&:hover': {
                                            transform: 'scale(2.05)' // Add scaling effect on hover
                                        }
                                    }}>
                                    <Controls.Typography variant="h1">Employee Portal</Controls.Typography>
                                    <Controls.CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    </Controls.CardContent>
                                </Controls.Card>
                            </Controls.Paper>
                        </Controls.Grid>
                    )}
                    {userData.includes('Management') && !userData.includes('Employee') && (
                        <Controls.Grid item xs={12} sm={6} md={5} lg={5}>
                            <Controls.Paper elevation={10} style={{ padding: 26 }}>
                                <Controls.Card
                                    onClick={handleManagementClick}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        backgroundImage: 'url("https://www.hyperoffice.com/blog/wp-content/uploads/2022/08/employees.png")',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        minHeight: '250px', // Set your desired height
                                        cursor: 'pointer',
                                    }}>
                                    <Controls.Typography  variant="h1">Management Portal</Controls.Typography>
                                    <Controls.CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    </Controls.CardContent>
                                </Controls.Card>
                            </Controls.Paper>
                        </Controls.Grid>
                    )}
                    {userData.includes('Employee') && userData.includes('Management') && (
                        <>
                            <Controls.Grid item xs={12} sm={6} md={5} lg={5}>
                                <Controls.Paper elevation={10} style={{ padding: 26 }}>
                                    <Controls.Card
                                        onClick={handleEmployeeClick}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            backgroundImage: 'url("https://www.shutterstock.com/image-vector/group-portrait-funny-smiling-office-260nw-1249852108.jpg")',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            cursor: 'pointer',
                                            minHeight: '250px', // Set your desired height
                                        }}>
                                        <Controls.Typography  variant="h1">Employee Portal</Controls.Typography>
                                        <Controls.CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        </Controls.CardContent>
                                    </Controls.Card>
                                </Controls.Paper>
                            </Controls.Grid>
                            <Controls.Grid item xs={12} sm={6} md={5} lg={5}>
                                <Controls.Paper elevation={10} style={{ padding: 26 }}>
                                    <Controls.Card
                                        onClick={handleManagementClick}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            backgroundImage: 'url("https://www.hyperoffice.com/blog/wp-content/uploads/2022/08/employees.png")',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            minHeight: '250px', // Set your desired height
                                            cursor: 'pointer',
                                        }}>
                                        <Controls.Typography  variant="h1">Management Portal</Controls.Typography>
                                        <Controls.CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        </Controls.CardContent>
                                    </Controls.Card>
                                </Controls.Paper>
                            </Controls.Grid>
                        </>
                    )}
                </Controls.Grid>
            )}
               </Controls.Box>
        </>
        </ThemeProvider>
    );
};

export default Portalsmain;