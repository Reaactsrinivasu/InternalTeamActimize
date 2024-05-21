import React from 'react';
import { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemIcon, ListItemText, List } from '@mui/material';
import { SidebarData } from './SidebarData';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
import useMediaQuery from '@mui/material/useMediaQuery';
import { loadUsersStart } from '../redux/actions/UserActions';
import { loadUserProfileDetailsStart, loadUserProfileDetailsSuccess } from '../redux/actions/userProfileDataActions';

const drawerWidth = 260;
const FixedSidebar = styled('div')({
    height: '90vh',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 transparent',
    '&::-webkit-scrollbar': {
        width: '1px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '5px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
    },
    '&::-webkit-scrollbar-track-piece': {
        background: '#ccc',
    },
});
const Drawer = styled(MuiDrawer)(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'absolute',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            position: 'fixed', // Set position to fixed
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            // backgroundColor: theme.palette.success.main,

        },
    }),
);
const StyledSidebarContent = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflowY: 'auto',
}));
const hasChildren = (item) => {
    const { items: children } = item;

    if (children === undefined) {
        return false;
    }

    if (children.constructor !== Array) {
        return false;
    }

    if (children.length === 0) {
        return false;
    }

    return true;
};
const MenuItem = ({ item }) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return (

        <Component item={item} />
    );
};
const LogoImage = styled('img')({
    width: '60px', // Adjust the width of the logo image as needed
    height: '40px', // Maintain aspect ratio
});
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 0),

    ...theme.mixins.toolbar,
}));
const DrawerHeaderbottom = styled('div')(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%', // Ensure it spans the entire width of the sidebar
    padding: theme.spacing(1, 1),
    ...theme.mixins.toolbar,
}));
const CustomListItemText = ({ primary, icon, ...rest }) => {
    const fontWeight = icon ? 500 : 200;
    const fontSize = icon ? "16px" : "12px";
    const opacity = icon ? 0.9 : 0.7;
    const color = icon ? theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebarheader.containedPrimarysidebarheadertext.color :   theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebarheader.color;
    return (
        <ListItemText
            {...rest}
            primary={
                <Typography
                    component="span"
                    variant="h4"
                    sx={{
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        color: color,
                        fontWeight: fontWeight,
                        fontSize: fontSize,
                        lineHeight: "1.5",
                        opacity: opacity
                    }}
                >
                    {primary}
                </Typography>
            }
        />
    );
};

const CustomMenuItem = ({ item }) => {
    // Customize how each list item is rendered here
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    const navigate = useNavigate();

    // Define custom styles for different menu items
    let customTextStyle = {};
    if (item.title === "Profile") {
        customTextStyle = {
            fontFamily: 'Arial, sans-serif',
            color: 'blue',
            opacity: '0.9',
            marginLeft: '55px',
            fontWeight: '800',
            fontSize: '20px',
            lineHeight: '2.5'
        };
    } else {
        customTextStyle = {
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            color: 'rgb(255, 255, 255)',
            opacity: '0.7',
            marginLeft: '55px',
            fontWeight: '800',
            fontSize: '20px',
            lineHeight: '2.5'
        };
    }

    const handleItemClick = () => {
        if (item.path) {
            navigate(item.path); // Navigate to the specified path if it exists
        }
    };

    return (
        <>
            <ListItem button onClick={handleItemClick}>
                <Typography variant="h2"
                    sx={{
                        ...customTextStyle,
                        fontWeight: '600', fontSize: '12px', lineHeight: '1.5',
                        color: theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebarheader.color,
                    }}
                >
                    {item.title}
                </Typography>
            </ListItem>
            {hasChildren(item) && <Component item={item} />}
        </>
    );
};
const SingleLevel = ({ item }) => {
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <ListItem button onClick={() => navigate(item.path)}>
                <ListItemIcon sx={{ color: theme.components.tables.styleOverrides.containedCustombaricons.color, opacity: "0.7" }}>{item.icon} </ListItemIcon>
                {/* <CustomListItemText primary={item.title} onClick={() => navigate(item.path)} /> */}
                <CustomListItemText primary={item.title} icon={item.icon} onClick={() => navigate(item.path)} />
            </ListItem>
        </ThemeProvider>
    );
};
const MultiLevel = ({ item }) => {
    const { items: children } = item;
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen((prev) => !prev);
    };
    return (
        <>
            <ThemeProvider theme={theme}>
                <ListItem button onClick={handleClick} >
                    <ListItemIcon sx={{ color: theme.components.tables.styleOverrides.containedCustombaricons.color, opacity: "0.7" }}>{item.icon}</ListItemIcon>
                    <CustomListItemText primary={item.title} icon={item.icon} />

                    {open ? <ExpandLessIcon sx={{ color: theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebaricon.color, opacity: "0.7" }} /> : <ExpandMoreIcon sx={{ color: theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebaricon.color, opacity: "0.7" }} />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding >
                        {children.map((child, key) => (
                            <CustomMenuItem key={key} item={child} />
                        ))}
                    </List>
                </Collapse>
            </ThemeProvider>
        </>
    );
};
const Sidebar = ({ open, setOpen }) => {
    const theme = useTheme();
    const [decodedProfilePic, setDecodedProfilePic] = useState('');
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const handleToggleSidebar = () => {
    
        setOpen(!open);
    };
    useEffect(() => {
        dispatch(loadUserProfileDetailsStart());
    }, [dispatch]);
    const users = useSelector((state) => state.userprofiledetailsdata?.data?.current_user || []);
    localStorage.setItem('id',users.id);
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

    return (
        <FixedSidebar >
            <Drawer variant="permanent" open={open} sx={{ flexShrink: 0, width: drawerWidth, whiteSpace: 'nowrap', zIndex: theme.zIndex.drawer + 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '90%', }}>
                    <DrawerHeader sx={{ backgroundColor: theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebarheader.backgroundColor, }}>
                        <Grid container alignItems="center" justifyContent="center" spacing={0} sx={{ marginRight: "15px" }}>
                            <Grid item>
                                <LogoImage src="/assets/images/finalized.png" style={{width:'40px', height:'40px'}} alt="Logo" />
                            </Grid>
                            <Grid item>
                                <Typography variant="h1" sx={{ color: theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebarheader.companyName.color, }}>Actimize</Typography>
                            </Grid>
                        </Grid>
                    </DrawerHeader>
                    <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', height: '0.5px' }} />
                    <StyledSidebarContent sx={{ backgroundColor: theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebarheader.backgroundColor, }}>
                        {SidebarData.map((item, index) => (
                            <Typography
                                component="span"
                                key={index}
                                onClick={item.title === "Logout" ? () => { localStorage.removeItem('token'); window.location.reload(false) } : null}
                                sx={{ color: theme.components.tables.styleOverrides.containedPrimarysidebar.color , fontWeight:'bold'}}
                            >
                                <MenuItem key={index} item={item}
                                    sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center'}} />
                            </Typography>
                        ))}
                    </StyledSidebarContent>
                    <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', height: '0.5px' }} />
                    <DrawerHeaderbottom sx={{ marginTop: 'auto', mt: '20%', backgroundColor: theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebarheader.backgroundColor, }}>
                        <Grid container alignItems="center" spacing={2} sx={{
                            padding: 1
                        }}>
                            <Grid item>
                                <Avatar alt="Avatar" src={decodedProfilePic} />
                            </Grid>
                            <Grid item>
                                <Typography variant="h9" 

                                >
                                    {users?.name} 
                                </Typography>
                                <Typography variant="h10" 

                                >
                                    {users?.designation}
                                </Typography>
                            </Grid>
                        </Grid>

                    </DrawerHeaderbottom>
                </div>
            </Drawer>
        </FixedSidebar>
    );
};

export default Sidebar;


