import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom'; 

import { QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';

import auth from '../../utils/auth';

const settings = [
  { label: 'Profile', link: '/home/profile' },
  { label: 'Logout', link: '/' }
];

export default function UserLogout() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { loading, data } = useQuery(QUERY_ME);
  
  const initials = data?.me?.initials;
  const first = data?.me?.firstname; 
  const last = data?.me?.lastname; 
  // console.log('Initials: ' + initials, 'Firstname: ' + first, 'Lastname: ' + last);



  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const logoutOnClick = (event) => {
     const logoutSetting = settings.find((setting) => setting.label === 'Logout');

    if (logoutSetting && event.currentTarget.innerText === logoutSetting.label) {
      auth.logout();
    }
  }



  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={`${first} ${last}`}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Initials" sx={{ bgcolor: '#663ab7' }} src="/static/images/avatar/2.jpg">{initials}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
            <Link 
              onClick= {logoutOnClick} 
              to={setting.link} 
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography textAlign="center">{setting.label}</Typography>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
