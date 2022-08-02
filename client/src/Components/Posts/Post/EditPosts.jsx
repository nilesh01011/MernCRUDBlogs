import { Container, Grid, Box, Typography, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import joi from 'joi-browser';
import { TextInputField } from '../../common/FormComponents';
import styled from 'styled-components';
import FileBase64 from 'react-file-base64';
import { EditPostData, GetPostsDetailsById } from '../../../HttpServices/Posts';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { PostStyles } from './postStyles';

function EditPosts() {
  const navigate = useNavigate();
  const classes = PostStyles();
  const { id } = useParams();
  const [formValidationError, setFormValidationError] = useState('');
  const [state, setState] = useState({
    data: {
      title: '',
      imageFileSet: '',
      description: '',
    },
    errors: {},
  });

  const schema = {
    title: joi.string().required().label('Title').min(5),
    imageFileSet: joi.string().required().label('Image'),
    description: joi.string().required().label('Description'),
  };

  const handleOnChange = ({ target }) => {
    const { data, errors } = state;
    const { error } = joi.validate(data[target.name], schema[target.name], {
      abortEarly: true,
    });
    !error
      ? (errors[target.name] = '')
      : (errors[target.name] = error.details[0].message);
    data[target.name] = target.value;
    setState({ data, errors });
  };

  const validate = () => {
    let errorObj = {};
    let { error } = joi.validate(state.data, schema, { abortEarly: false });

    !error
      ? (errorObj = {})
      : error.details.map((item) => (errorObj[item.path] = item.message));
    return errorObj;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let errors = validate();
    let { data } = state;
    setState({ data, errors });

    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      ///app post request logic
      EditPostData({ id, data })
        .then(() => {
          toast.success('Post Updated Successfully');
          //reset Form
          setState({
            data: {
              title: '',
              imageFileSet: '',
              description: '',
            },
            errors: {},
          });
          //navigate to /posts
          navigate('/posts');
        })
        .catch((e) => {
          console.log('error', e);
          setFormValidationError(e.message);
        });
    }
  };

  useEffect(() => {
    GetPostsDetailsById({ id })
      .then(({ data: { data: item } }) => {
        const { data, errors } = state;
        data.title = item.title;
        data.imageFileSet = item.imageFileSet;
        data.description = item.title;

        console.log(data.title);

        setState({ data, errors });
      })
      .catch((e) => {
        console.log('error', e);
        navigate('/posts');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={2}>
        {/* updating image */}
        <Grid item xs={12} sm={6}>
          <img
            src={state.data.imageFileSet}
            alt={state.data.title}
            className={classes.responsiveImg}
          />
        </Grid>
        {/* form container */}
        <Grid item xs={12} sm={6}>
          <Grid container>
            <Grid item xs={12}>
              <Box mt={2} mb={2}>
                <Typography
                  variant='h6'
                  style={{ fontSize: '1.5rem', fontWeight: '600' }}
                  align='center'
                >
                  Edit Blog Post
                </Typography>
                <Typography variant='subtitle2' color='error' align='center'>
                  {formValidationError}
                </Typography>
              </Box>
              <form onSubmit={handleOnSubmit}>
                <Box mt={2} mb={1}>
                  <TextInputField
                    state={state}
                    name='title'
                    onChange={handleOnChange}
                  />
                </Box>
                <Box mt={2} mb={1}>
                  <FileBase64
                    onDone={(e) => {
                      let { data, errors } = state;

                      data.imageFileSet = e.base64;
                      errors.imageFileSet = '';
                      setState({ data, errors });
                    }}
                  />
                  <Typography variant='subtitle2' color='error'>
                    {state.errors.imageFileSet
                      ? state.errors.imageFileSet
                      : null}
                  </Typography>
                </Box>
                <Box mt={2} mb={1}>
                  <TextInputField
                    state={state}
                    name='description'
                    onChange={handleOnChange}
                    multiline
                    rows={4}
                  />
                </Box>
                <Box mt={2} mb={1}>
                  <ButtonContainer>
                    <Button type='submit' fullWidth>
                      {' '}
                      Submit{' '}
                    </Button>
                  </ButtonContainer>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default EditPosts;

const ButtonContainer = styled.div`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  padding: 0 30px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;

  & Button {
    color: #fff;
    font-weight: 700;
    font-size: 1rem;
  }
`;
