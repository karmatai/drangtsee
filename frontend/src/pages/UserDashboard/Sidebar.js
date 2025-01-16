import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';

function Sidebar() {
  return (
    <List component="nav">
      <ListItem button component={Link} to="/dashboard/favorites">
        <ListItemText primary="Favorite Songs" />
      </ListItem>
      <ListItem button component={Link} to="/dashboard/contributions">
        <ListItemText primary="My Contributions" />
      </ListItem>
      <ListItem button component={Link} to="/dashboard/profile">
        <ListItemText primary="Profile" />
      </ListItem>
    </List>
  );
}

export default Sidebar;