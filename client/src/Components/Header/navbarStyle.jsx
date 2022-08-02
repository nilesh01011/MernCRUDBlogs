import { makeStyles } from '@mui/styles';

export const NavbarStyle = makeStyles((theme) => ({
  navbar: {
    '@media screen and (max-width: 600px)': {
      '&': {
        position: 'static !important',
      },
    },
  },
  grow: {
    flexGrow: 1,
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',

    '@media screen and (max-width: 600px)': {
      '&': {
        alignItems: 'flex-start !important',
        paddingTop: '15px !important',
        paddingBottom: '15px !important',
      },
    },
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'row wrap',
  },
  logo: {
    height: '28px',
    width: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 3px',
    borderRadius: '50%',
    border: '2px solid #fff',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  logoO: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
  buttons: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    padding: '0 30px',

    '@media screen and (max-width: 510px)': {
      '&': {
        width: '100%',
      },
    },

    '&:hover': {
      opacity: '0.9',
    },
  },

  // search Box

  search: {
    width: '250px',
    margin: '0 16px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: '0.2rem 0.7rem',
    borderRadius: '4px',
    paddingLeft: '4px',

    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.5)',
    },

    '@media screen and (max-width: 600px)': {
      '&': {
        margin: '1rem 0',
        width: '100%',
      },
    },
  },

  searchIcon: {
    width: '2rem',
    height: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  inputRoot: {
    color: '#fff !important',
  },

  inputInput: {
    padding: '8px',
    paddingLeft: '1rem',
    color: '#fff',
  },

  infoMsg: {
    width: '100%',
    position: 'absolute',
    bottom: '-20px',
    left: '0px',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: '#fff',
  },
}));
