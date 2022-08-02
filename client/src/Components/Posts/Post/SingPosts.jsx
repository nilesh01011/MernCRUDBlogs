import { Card, CardContent, Grow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { PostStyles } from './postStyles';

function SingPosts({ item }) {
  const classes = PostStyles();
  return (
    <Grow in>
      <Card>
        <Box className={classes.cardImageContainer}>
          <img
            src={item.imageFileSet}
            className={classes.responsiveImg}
            alt={item.title}
          />
        </Box>
        <CardContent>
          <Link to={`/posts/${item._id}`} className={classes.Link}>
            <Typography variant='body1' component='h6' color='textPrimary'>
              {item.title}
            </Typography>
          </Link>
        </CardContent>
      </Card>
    </Grow>
  );
}

export default SingPosts;
