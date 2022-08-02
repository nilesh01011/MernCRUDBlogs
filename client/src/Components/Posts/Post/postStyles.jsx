import { makeStyles } from '@mui/styles';

export const PostStyles = makeStyles((theme) => ({
  responsiveImg: {
    width: '100%',
    height: '350px',
  },
  card: {
    width: '100%',
    maxWidth: '500px',
  },
  danger: {
    color: 'red',
  },
  cardImageContainer: {
    width: '100%',
    height: 'auto',
    maxHeight: '480px',
    overflowY: 'hidden',
  },
  Link: {
    textDecoration: 'none',
  },
}));
