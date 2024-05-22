import React, { useState, useEffect } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector, useDispatch } from 'react-redux';
import { styled, createTheme,  } from '@mui/material/styles';
import { loadUsersStart } from '../redux/actions/UserActions';
import Sidebar from './Sidebar';
import { Routes, Route } from 'react-router-dom';
import SidebarMangment from './SidebarMangement';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardMangement from '../pages/DashboardMangement';
import ExpertCreation from '../pages/ExpertCreation';
import ExpertPage from '../pages/ExpertPage';
import LeaveBank from '../pages/LeaveBank';
import LeaveRequests from '../pages/LeaveRequests';
import ExpertWeeklyStatus from '../pages/ExpertWeeklyStatus';
import ExpertMothlyStatus from '../pages/ExpertMothlyStatus';
import ExpertAttendenceList from '../pages/ExpertAttendenceList';
import ExpertMonthlyAttendenceList from '../pages/ExpertMonthlyAttendenceList';
import ExpertCertificateVarification from '../pages/ExpertCertificateVarification';
import ExpertReleavingData from '../pages/ExpertReleavingData';
import ExpertPerformanceAppraisals from '../pages/ExpertPerformanceAppraisals';
import ExpertDmerits from '../pages/ExpertDmerits';
import ProficiencyMangement from '../pages/ProficiencyMangement';
import ProjectsMangement from '../pages/ProjectsMangement';
import HolidaysMangement from '../pages/HolidaysMangement';
import PayslipMangement from '../pages/PayslipMangement';
import BirthdaysManagement from '../pages/BirthdaysMangement';
import EventsMangement from '../pages/EventsMangement';
import Gadgetsmangement from '../pages/Gadgetsmangement';
import Requestsmangement from '../pages/Requestsmangement';
import ExpertWiseEmergency from '../pages/ExpertWiseEmergency';
import ExpertWisetFamily from '../pages/ExpertWisetFamily';
import ExpertWiseSkills from '../pages/ExpertWiseSkills';
import ExpertWiseExperience from '../pages/ExpertWiseExperience';
import ExpertWisebankDetails from '../pages/ExpertWisebankDetails';
import ExpertWiseProjects from '../pages/ExpertWiseProjects';
import ExpertWiseLeaveBank from '../pages/ExpertWiseLeaveBank';
import Controls from './Controls';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Icon } from "@iconify/react";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { loadNotificationsDetailsStart } from '../redux/actions/loadNotificationsActions';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { readnotificationStart } from '../redux/actions/readNotificationsActions';
import Switch from '@mui/material/Switch';
import { allowNotificationStart } from '../redux/actions/allowNotificationsActions';
import { ThemeProvider } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/Image';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import theme from "../Theme";
const drawerWidth = 260;
const AppBar = styled(MuiAppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed',
    width: `calc(100% - ${drawerWidth}px)`, // Adjust width based on sidebar width
    marginLeft: drawerWidth, // Adjust margin based on sidebar width
    minWidth: '100px', // Set a fixed minimum width for the AppBar
}));

const mdTheme = createTheme();

const Hrportal = () => {
    const [open, setOpen] = useState(true);
    const [decodedProfilePic, setDecodedProfilePic] = useState('');
    const [anchorElNotifications, setAnchorElNotifications] = useState(null);
    const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null); // Define anchorEl state variable
   
    const dispatch = useDispatch();
    const users = useSelector((state) => state.data.data);
    const notifications = useSelector((state) => state.loadnotificationData.data);
    const navigate = useNavigate();

    const handleClick = (event) => { // Define handleClick function
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickNotifications = (event) => {
        setAnchorElNotifications(event.currentTarget);
    };

    const handleCloseNotifications = () => {
        setAnchorElNotifications(null);
    };
    const handleNotificationsToggle = () => {
        const updatedState = !notificationsEnabled;
        setNotificationsEnabled(updatedState);
        localStorage.setItem('notificationsEnabled', String(updatedState));
        // Dispatch the action with the updated state
        dispatch(allowNotificationStart(updatedState));
    };

    useEffect(() => {
        dispatch(loadUsersStart());
        dispatch(loadNotificationsDetailsStart());
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
        if (notifications && notifications.unread_notification) {
            setUnreadNotificationsCount(notifications.unread_notification);
        }
    }, [notifications]);
    
    useEffect(() => {
        const storedNotificationsState = localStorage.getItem('notificationsEnabled');
        if (storedNotificationsState !== null) {
            setNotificationsEnabled(storedNotificationsState === 'true');
        }
    }, []);// Only run this effect once when the component mounts
    const renderNotificationsMenu = () => {
        const getTimeDifferenceString = (timestamp) => {
            const currentTime = new Date();
            const notificationTime = new Date(timestamp);
            const timeDifferenceInMilliseconds = currentTime - notificationTime;
        
            const seconds = Math.floor(timeDifferenceInMilliseconds / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
        
            if (days > 0) {
                return `${days} day${days > 1 ? 's' : ''} ago`;
            } else if (hours > 0) {
                return `${hours} hour${hours > 1 ? 's' : ''} ago`;
            } else if (minutes > 0) {
                return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            } else {
                return 'Just now';
            }
        };
        
        const NotificationItem = ({ notification }) => {
            const [expanded, setExpanded] = useState(false);

            const toggleExpanded = () => {
                setExpanded(!expanded);
            };

            const handleNotificationClick = () => {
                dispatch(readnotificationStart(notification.id));
                dispatch(loadNotificationsDetailsStart());
                setTimeout(() => {
                    dispatch(loadNotificationsDetailsStart());
                }, 200);
            };

            return (
            
                    <ListItem
                        alignItems="flex-start"
                        style={{
                            cursor: 'pointer',
                            transition: 'height 0.2s',
                            overflow: 'hidden',
                            height: expanded ? 'auto' : '64px',
                            borderBottom: '1px solid #ccc',
                             // Add bottom border for separation
                        }}
                        onClick={handleNotificationClick}
                        onMouseEnter={() => setExpanded(true)}
                        onMouseLeave={() => setExpanded(false)}
                    >
                        <ListItemAvatar sx={{ paddingLeft: "5px" }}>
                            <Avatar sx={{ backgroundColor: 'blue' }}>
                                <ImageIcon />
                            </Avatar>

                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography    variant="h6"
                    sx={{
                        fontWeight: notification.is_read ? 400 : "500",
                        marginRight: 'auto' // Align to the left start
                    }}
                >
                    {notification.headings}
                </Typography>
                <Typography  variant="h6"
                    sx={{
                        fontWeight: notification.is_read ? 400 : "500",
                        marginLeft: 'auto' // Align to the right start
                    }}
                >
                    {getTimeDifferenceString(notification.created_at)}
                </Typography>
            </div>
        </React.Fragment>
                            }
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="div"
                                        variant="h7"
                                    >
                                        {notification.contents}
                                    </Typography>
                                    <Typography
                                       variant="h7"
                                    >
                                        {new Date(notification.created_at).toLocaleString()}
                                    </Typography>

                                </React.Fragment>
                            }
                        />
                    </ListItem>
            );
        };
      
        if (!Array.isArray(notifications?.notifications)) {
            return null;
        }

        return (
            <Menu
                sx={{ mt: 2 }}
                anchorEl={anchorElNotifications}
                open={Boolean(anchorElNotifications)}
                onClose={handleCloseNotifications}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    style: {
                        maxHeight: '300px', // Adjust the max height as needed
                        // Enable scrolling
                        '&::-webkit-scrollbar': {
                            display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, etc.)
                        },
                    },
                }}
            >
                <Box sx={{
                    width: '300px', border: '1px solid #ccc', marginTop: "-9px",
                    textAlign: 'center',
                    backgroundColor:theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebarheader.Notificationbox.backgroundColor,
                }}>
                    <Typography variant="h6" sx={{ marginBottom: '8px', marginTop: "8px", }}>
                        {unreadNotificationsCount} New Notifications
                    </Typography>



                    <div style={{ borderTop: '1px solid #ccc', marginTop: '1px', }}></div>
                    <List sx={{ padding: 0 }}> {/* Override default padding */}
                        {notifications.notifications.map(notification => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </List>
                </Box>


            </Menu>
        );
    };




    return (
      <ThemeProvider theme={theme}>
        <Controls.Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            sx={{
              backgroundColor:
                theme.components.tables.styleOverrides.containedPrimarysidebar
                  .containedPrimarysidebarheader.backgroundColor,
              display: "flex",
            }}
          >
            <Controls.Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                padding: "4px",
              }}
            >
              <IconButton size="large" color="inherit">
                <Badge
                  badgeContent={unreadNotificationsCount}
                  sx={{
                    "& .MuiBadge-badge": {
                      color:
                        theme.components.MuiButton.styleOverrides
                          .containedAddButton.textColor,
                      backgroundColor:
                        theme.components.MuiButton.styleOverrides
                          .containedAddButton.backgroundColor,
                      borderColor:
                        theme.components.MuiButton.styleOverrides
                          .containedAddButton.borderColor,
                      border: "1px solid", // Set border color and width
                    },
                  }}
                >
                  <NotificationsOutlinedIcon
                    sx={{
                      mt: 0.5,
                      color:
                        theme.components.MuiButton.styleOverrides
                          .containedAddButton.textColor,
                      fontSize: "1.8rem",
                    }} // Adjust fontSize for larger icon
                    onClick={handleClickNotifications}
                  />
                </Badge>
              </IconButton>
              <IconButton size="large" color="inherit">
                <Icon
                  icon="icons8:shutdown"
                                style={{
                                    color:'red'
                                }}
                  onClick={handleClick}
                  sx={{ mt: 1, fontSize: "2.1rem" }}
                />
              </IconButton>
            </Controls.Stack>
            <Controls.Menu
              disableScrollLock={true}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              getContentAnchorEl={null} // Add this line to prevent the menu from tilting
              sx={{ mt: 2, width: "180px" }} // Add margin-top
              PaperProps={{
                style: {
                  backgroundColor: theme.palette.customColorOrange.main,
                },
              }} // Add background color here
            >
              <Controls.MenuItem
                sx={{
                  color: theme.palette.error.main,
                  fontSize: "13px",
                  fontFamily:
                    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontWeight: 400,
                  lineHeight: 1.5,
                }}
                onClick={() => navigate("/emp/profiles/userprofile")}
              >
                Profile
              </Controls.MenuItem>

              <Controls.MenuItem
                sx={{
                  color: theme.palette.error.main,
                  fontSize: "13px",
                  fontFamily:
                    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontWeight: 400,
                  lineHeight: 1.5,
                }}
              >
                Notifications
                <Switch
                  checked={notificationsEnabled}
                  sx={{ transform: "scale(0.75)" }} // Adjust the scale factor as needed
                  onChange={handleNotificationsToggle}
                  inputProps={{ "aria-label": "toggle notifications" }}
                />
              </Controls.MenuItem>
              <Controls.MenuItem
                sx={{
                  color: theme.palette.error.main,
                  fontSize: "13px",
                  fontFamily:
                    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontWeight: 400,
                  lineHeight: 1.5,
                }}
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload(false);
                }}
              >
                Logout
              </Controls.MenuItem>
            </Controls.Menu>

            {renderNotificationsMenu()}
          </AppBar>
          <SidebarMangment {...{ open, setOpen }} />
          <Controls.Box
            component="main"
            sx={{
              backgroundColor: "default",
              flexGrow: 1,
              p: 3,
              overflow: "auto",
              my: 7,
              height: "68rem",
            }}
          >
            <Routes>
              <Route path="/" exact element={<DashboardMangement />} />
              <Route path="/">
                <Route
                  path="/experts/expertscreation"
                  element={<ExpertCreation />}
                />
                <Route path="/experts/expertpage" element={<ExpertPage />} />
                <Route
                  path="/experts/leaves/leavebank"
                  element={<LeaveBank />}
                />
                <Route
                  path="/experts/leaves/leaverequests"
                  element={<LeaveRequests />}
                />
                <Route
                  path="/experts/expertstatus/weeklystatus"
                  element={<ExpertWeeklyStatus />}
                />
                <Route
                  path="/experts/expertstatus/mothlystatus"
                  element={<ExpertMothlyStatus />}
                />
                <Route
                  path="/experts/attendence/attendencelist"
                  element={<ExpertAttendenceList />}
                />
                <Route
                  path="/experts/attendence/monthlyattendencelist"
                  element={<ExpertMonthlyAttendenceList />}
                />
                <Route
                  path="/experts/certificate_verification"
                  element={<ExpertCertificateVarification />}
                />
                <Route
                  path="/experts/expert-releavingdata"
                  element={<ExpertReleavingData />}
                />
                <Route
                  path="/experts/performance_appraisals"
                  element={<ExpertPerformanceAppraisals />}
                />
                <Route path="/experts/dmerits" element={<ExpertDmerits />} />
                <Route path="/proficiency" element={<ProficiencyMangement />} />
                <Route path="/projects" element={<ProjectsMangement />} />
                <Route path="/holidays" element={<HolidaysMangement />} />
                <Route path="/payslip" element={<PayslipMangement />} />
                <Route path="/birthdays" element={<BirthdaysManagement />} />
                <Route path="/schedules-events" element={<EventsMangement />} />
                <Route path="/gadgets" element={<Gadgetsmangement />} />
                <Route
                  path="/experts/expertpage/personaldetails/:id"
                  element={<Requestsmangement />}
                />
                <Route
                  path="/experts/expertpage/emergencydetails/:id"
                  element={<ExpertWiseEmergency />}
                />
                <Route
                  path="/experts/expertpage/familydetails/:id"
                  element={<ExpertWisetFamily />}
                />
                <Route
                  path="/experts/expertpage/skills/:id"
                  element={<ExpertWiseSkills />}
                />
                <Route
                  path="/experts/expertpage/workexperience/:id"
                  element={<ExpertWiseExperience />}
                />
                <Route
                  path="/experts/expertpage/bankdetails/:id"
                  element={<ExpertWisebankDetails />}
                />
                <Route
                  path="/experts/expertpage/projects/:id"
                  element={<ExpertWiseProjects />}
                />
                <Route
                  path="/experts/expertpage/leavebank/:id"
                  element={<ExpertWiseLeaveBank />}
                />
              </Route>
            </Routes>
          </Controls.Box>
        </Controls.Box>
      </ThemeProvider>
    );
};

export default Hrportal;
