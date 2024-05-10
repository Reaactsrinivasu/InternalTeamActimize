import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const NotificationBox = ({ open, onClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{ width: 300, p: 2 }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <Typography variant="h6" gutterBottom>
          Notifications
        </Typography>
        <Divider />
        <List>
          {/* Replace this with actual notification data */}
          <ListItem button>
            <ListItemText primary="Notification 1" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Notification 2" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default NotificationBox;