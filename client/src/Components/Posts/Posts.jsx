import { CircularProgress, Container, Grid, Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { GetAllPosts } from '../../HttpServices/Posts';
import SingPosts from './Post/SingPosts';

function Posts({ searchPostData }) {
  const [postData, SetPostData] = useState([]);

  const GetAllPostsByRequest = () =>
    GetAllPosts()
      .then(({ data: { data } }) => {
        SetPostData(data);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    searchPostData.length === 0
      ? GetAllPostsByRequest()
      : SetPostData(searchPostData);
  }, [searchPostData]);

  return (
    <Container>
      <Grid container spacing={2}>
        {postData.length ? (
          postData.map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <SingPosts item={item} />
            </Grid>
          ))
        ) : (
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
        )}
      </Grid>
    </Container>
  );
}

export default Posts;
