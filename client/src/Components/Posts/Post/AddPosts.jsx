import { Container, Grid, Box, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import joi from 'joi-browser';
import { TextInputField } from '../../common/FormComponents';
import styled from 'styled-components';
import FileBase64 from 'react-file-base64';
import { AddNewPosts } from '../../../HttpServices/Posts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddPosts() {
  const navigate = useNavigate();

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
    title: joi.string().required().label('Title').min(4),
    imageFileSet: joi.string().required().label('Image File Set'),
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

    //add posts logic

    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      AddNewPosts({ data })
        .then(() => {
          console.log('New Post Add Successfully...');
          toast.success('Post Added Successfully');
          console.log(data);

          // reset forms
          setState({
            data: {
              title: '',
              imageFileSet: '',
              description: '',
            },
            errors: {},
          });

          // navigate to post routes
          navigate('/posts');
        })
        .catch((e) => {
          console.log('error', e);
          setFormValidationError(e.message);
          console.log(data);
        });
    }
  };

  return (
    <Container maxWidth='md' component={Box} mt={5}>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs={12} sm={6}>
          <Box mt={2} mb={2}>
            <Typography
              variant='h6'
              style={{ fontSize: '1.5rem', fontWeight: '600' }}
              align='center'
            >
              Add Blog Posts
            </Typography>
            <Typography variant='subtitle2' color='error' align='center'>
              {formValidationError}
            </Typography>
          </Box>

          <form onSubmit={handleOnSubmit}>
            <Box mt={2} mb={2}>
              <TextInputField
                state={state}
                name='title'
                onChange={handleOnChange}
              />
            </Box>

            <Box mt={2} mb={2} variant='outlined'>
              <FileBase64
                fullWidth
                onDone={(e) => {
                  let { data, errors } = state;

                  data.imageFileSet = e.base64;
                  errors.imageFileSet = '';
                  setState({ data, errors });
                }}
              />
              <Typography variant='subtitle2' color='error'>
                {state.errors.imageFileSet ? state.errors.imageFileSet : null}
              </Typography>
            </Box>

            <Box mt={2} mb={2}>
              <TextInputField
                state={state}
                name='description'
                onChange={handleOnChange}
                multiline
                rows={4}
              />
            </Box>

            <Box>
              <ButtonContainer>
                <Button type='submit' fullWidth>
                  Submit
                </Button>
              </ButtonContainer>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AddPosts;

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
