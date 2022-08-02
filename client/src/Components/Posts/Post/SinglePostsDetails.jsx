import {
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  CircularProgress,
  Box,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Button,
  CardActions,
} from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PostStyles } from './postStyles';
import { useEffect } from 'react';
import {
  DeletePostById,
  GetPostsDetailsById,
} from '../../../HttpServices/Posts';
import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DialogComponent from '../../common/DialogComponent';
import { toast } from 'react-toastify';

function SinglePostsDetails() {
  const navigate = useNavigate();

  const classes = PostStyles();

  const [data, setData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    GetPostsDetailsById({ id })
      .then(({ data: { data } }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          navigate('/posts');
        }
      });
  });

  // Menu Tootip

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //dialog purpose
  const [dialogOpen, setDialogOpen] = useState(false);

  const DialogContent = () => (
    <Grid container>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography
              variant='h6'
              color='primary'
              align='center'
              gutterBottom
            >
              Are You Sure Want to Delete ?
            </Typography>
            <Typography variant='h5' color='error' align='center' gutterBottom>
              {data.title}
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Box mt={1} mb={1}>
              <Button
                variant='outlined'
                color='primary'
                style={{
                  marginRight: '16px',
                  textTransform: 'capitalize',
                }}
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant='outlined'
                style={{
                  textTransform: 'capitalize',
                  color: '#fff',
                  background: '#f44336',
                  borderColor: '#f44336',
                }}
                onClick={() =>
                  DeletePostById({ id }).then(() => {
                    setDialogOpen(false);
                    toast.success('Post Deleted successfully');
                    navigate('/posts');
                  })
                }
              >
                Delete
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );

  const formatDate = (str) => {
    let date = new Date();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  return (
    <Container>
      <DialogComponent
        openState={dialogOpen}
        handleDialogClose={() => setDialogOpen(false)}
        content={<DialogContent />}
      />
      {/* Dialog End */}
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={handleClose}
          color='primary'
          component={Link}
          to={`/posts/edit/${id}`}
        >
          <Button
            startIcon={<EditIcon />}
            color='primary'
            style={{ textTransform: 'capitalize' }}
          >
            Edit
          </Button>
        </MenuItem>

        <MenuItem>
          <Button
            startIcon={<DeleteForeverIcon />}
            className={classes.danger}
            color='secondary'
            style={{ textTransform: 'capitalize', color: '#f44336' }}
            onClick={() => {
              handleClose();
              setDialogOpen(true);
            }}
          >
            Delete
          </Button>
        </MenuItem>
      </Menu>
      {/* Menu list End */}
      {!Object.keys(data).length ? (
        <Grid item xs={12}>
          <Box
            p={5}
            mt={5}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <CircularProgress />
          </Box>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <List>
                <ListItem>
                  <ListItemText>
                    <Typography variant='h6' color='textPrimary'>
                      {data.title}
                    </Typography>

                    {data.publishedAt ? (
                      <Typography
                        variant='body1'
                        component='h6'
                        color='textSecondary'
                      >
                        {formatDate(data.publishedAt)}
                      </Typography>
                    ) : null}
                  </ListItemText>

                  <ListItemSecondaryAction>
                    <IconButton onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              {/* list End */}
              <img
                className={classes.responsiveImg}
                src={data.imageFileSet}
                alt={data.title}
              />
              <CardContent>
                <Typography
                  variant='body1'
                  component='h6'
                  color='textSecondary'
                >
                  {data.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default SinglePostsDetails;
