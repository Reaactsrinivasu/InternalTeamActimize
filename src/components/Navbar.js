import React, { useState, useEffect } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector, useDispatch } from 'react-redux';
import { styled, createTheme } from '@mui/material/styles';
import { loadUsersStart } from '../redux/actions/UserActions';
import Sidebar from './Sidebar';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../pages/UserProfile';
import MyProjects from '../pages/MyProjects';
import HoursEntry from '../pages/HoursEntry';
import BankDetails from '../pages/BankDetails';
import DailyStatus from '../pages/DailyStatus';
import FamilyDetails from '../pages/FamilyDetails';
import WorkExperience from '../pages/WorkExperience';
import PersonalDetails from '../pages/PersonalDetails';
import EmergencyDetails from '../pages/EmergencyDetails';
import Skills from '../pages/Skills';
import Leaves from '../pages/Leaves';
import Dashboard from '../pages/Dashboard';
import Controls from './Controls';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { allowNotificationStart } from '../redux/actions/allowNotificationsActions';
import { loadNotificationsDetailsStart } from '../redux/actions/loadNotificationsActions';
import { readnotificationStart } from '../redux/actions/readNotificationsActions';
import { Icon } from "@iconify/react";
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import ImageIcon from '@mui/icons-material/Image';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import theme from '../Theme';
const drawerWidth = 260;
const AppBar = styled(MuiAppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed',
    width: `calc(100% - ${drawerWidth}px)`, // Adjust width based on sidebar width
    marginLeft: drawerWidth, // Adjust margin based on sidebar width
    minWidth: '100px', // Set a fixed minimum width for the AppBar
}));


// const POLLING_INTERVAL = 60000;
const mdTheme = createTheme();

const Navbar = () => {
    const [open, setOpen] = useState(true);
    const [decodedProfilePic, setDecodedProfilePic] = useState('');
    const [anchorElNotifications, setAnchorElNotifications] = useState(null);
    const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const dispatch = useDispatch();
    const users = useSelector((state) => state.data.data);
    const notifications = useSelector((state) => state.loadnotificationData.data);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadUsersStart());
        dispatch(loadNotificationsDetailsStart());
    }, [dispatch]);
    
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
    const handleNotificationsToggle = () => {
        const updatedState = !notificationsEnabled;
        setNotificationsEnabled(updatedState);
        localStorage.setItem('notificationsEnabled', String(updatedState));
        // Dispatch the action with the updated state
        dispatch(allowNotificationStart(updatedState));
    };

    const handleClickNotifications = (event) => {
        setAnchorElNotifications(event.currentTarget);
    };

    const handleCloseNotifications = () => {
        setAnchorElNotifications(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                            // backgroundColor: notification.is_read ? '#f0f0f0' : '#e6f7ff',
                            // Different background colors for read and unread notifications
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
                        // overflow: 'auto',
                        // Enable scrolling
                        '&::-webkit-scrollbar': {
                            display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, etc.)
                        },
                    },
                }}
            >
                <Box sx={{
                    width: '300px', border: '1px solid #ccc', marginTop: "-9px",
                    //   padding: '16px',
                    textAlign: 'center',
                    // opacity:"0.8"
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
      // <ThemeProvider theme={theme}>
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
            <IconButton size="large" sx={{ mt: 0.55 }}>
              <Icon
                icon="icons8:shutdown"
                style={{
                  color: "red",
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
              style: { backgroundColor: theme.palette.customColorOrange.main },
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
          {/* </Controls.Toolbar> */}
        </AppBar>
        {/* </Controls.Box> */}
        <Sidebar {...{ open, setOpen }} />
        <Controls.Box
          component="main"
          sx={{
            backgroundColor: "default",
            flexGrow: 1,
            p: 3,
            // overflow: 'auto',
            my: 7,
            height: "50rem",
          }}
        >
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/profiles">
              <Route
                path="/profiles/personaldetails"
                element={<PersonalDetails />}
              />
              <Route
                path="/profiles/familydetails"
                element={<FamilyDetails />}
              />
              <Route
                path="/profiles/emergencydetails"
                element={<EmergencyDetails />}
              />
              <Route path="/profiles/userprofile" element={<UserProfile />} />
            </Route>
            <Route path="/workandskills">
              <Route
                path="/workandskills/workexperience"
                element={<WorkExperience />}
              />
              <Route path="/workandskills/skills" element={<Skills />} />
            </Route>
            <Route path="/tasks">
              <Route path="/tasks/dailystatus" element={<DailyStatus />} />
              <Route path="/tasks/hoursentry" element={<HoursEntry />} />
            </Route>
            <Route path="/myprojects" element={<MyProjects />} />
            <Route path="/bankdetails" element={<BankDetails />} />
            <Route path="/leaves" element={<Leaves />} />
          </Routes>
        </Controls.Box>
      </Controls.Box>
    );
};

export default Navbar;
