import React from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
export const  SidebarData = [
    {
        path: "/emp",
        title: "Dashboard",
        icon: <ListOutlinedIcon />
    },
    {
        path: null,
        title: "Profile",
        icon: <PeopleOutlineOutlinedIcon />,
        iconClosed: <ExpandLessIcon />,
        iconOpened: <ExpandMoreIcon />,
        items: [
            {
                title: "FamilyDetails",
                path: "/emp/profiles/familydetails",
                // icon: <Diversity3Icon />
 
            },
            {
                title: "EmergencyDetails",
                path: "/emp/profiles/emergencydetails",
                // icon: <ContactEmergencyIcon />
 
            },
            {
                title: "UserProfile",
                path: "/emp/profiles/userprofile",
                // icon: <AccountCircleIcon />
 
            },
        ],
    },
 
    {
        title: "Experience Skills",
        path: null,
        icon: <WorkHistoryOutlinedIcon />,
        items: [
            {
                title: "WorkExpereince",
                path: "/emp/workandskills/workexperience",
                // icon: <HomeRepairServiceIcon />
            },
            {
                title: "Skills",
                path: "/emp/workandskills/skills",
                // icon: <FormatPaintIcon />
            },
        ],
    },
    {
        title: "Tasks",
        path: null,
        icon: <IntegrationInstructionsOutlinedIcon />,
        items: [
            {
                title: "DailyStatus",
                path: "/emp/tasks/dailystatus",
                // icon: <PostAddIcon />
                
            },
            {
                title: "HoursEntry",
                path: "/emp/tasks/hoursentry",
                // icon: <QueryBuilderIcon />
            },
        ],
    },
 
    {
        title: "MyProjects",
        path: "/emp/myprojects",
        icon: <FactCheckOutlinedIcon />
    },
    {
        title: "Leaves",
        path: "/emp/leaves",
        icon: <RestoreOutlinedIcon />
    },
    {
        title: "BankDetails",
        icon: <AccountBalanceOutlinedIcon />,
        path: "/emp/bankdetails",
    },
 
   
 
];