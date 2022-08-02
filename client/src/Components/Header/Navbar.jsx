import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { NavbarStyle } from './navbarStyle';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CircularProgress, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Navbar({ searchPostData, handleSearchOnChange }) {
  const clasess = NavbarStyle();

  const [isOnChange, setIsOnChange] = useState(false);

  useEffect(() => {
    setIsOnChange(false);
  }, [searchPostData]);

  return (
    <AppBar position='sticky' top='0' className={clasess.navbar}>
      <NavbarContainer>
        <Toolbar className={clasess.toolbar}>
          <Link to='/' className={clasess.link}>
            <Box sx={{ flexGrow: 1 }} className={clasess.logoContainer}>
              <Typography sx={{ fontWeight: '700' }} className={clasess.logo}>
                B
              </Typography>
              <Typography
                variant='h6'
                component='div'
                sx={{ flexGrow: 1, fontWeight: 'bold', marginLeft: '16px' }}
              >
                BL<span className={clasess.logoO}>O</span>G
              </Typography>
            </Box>
          </Link>
          {/* logo End */}
          <div className={clasess.grow} />
          {/* space grow End */}
          <div className={clasess.search}>
            <div className={clasess.searchIcon}>
              {!isOnChange ? (
                <SearchIcon />
              ) : (
                <CircularProgress
                  style={{ width: '20px', height: '20px', color: '#fff' }}
                />
              )}
            </div>
            <InputBase
              placeholder='Search ...'
              inputProps={{ 'aria-details': 'search' }}
              classes={{
                root: clasess.inputRoot,
                input: clasess.inputInput,
              }}
              onChange={({ target }) => {
                handleSearchOnChange(target);
                setIsOnChange(true);
              }}
            />
          </div>
          {/* search fields End */}

          <Button
            component={Link}
            to='/posts/add'
            variant='contained'
            sx={{ fontWeight: '600' }}
            className={clasess.buttons}
            startIcon={<PostAddIcon />}
          >
            Add Post
          </Button>
        </Toolbar>
      </NavbarContainer>
    </AppBar>
  );
}

export default Navbar;

const NavbarContainer = styled.div`
  padding: 0 2rem;

  @media screen and (max-width: 1038px) {
    & {
      padding: 0;
    }
  }
`;
