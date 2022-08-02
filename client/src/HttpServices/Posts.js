import http from './HttpRequest';

//getting all posts
export const GetAllPosts = () =>
  http.get(`https://merncrudblogs.herokuapp.com/posts`);

//getting post data by id
export const GetPostsDetailsById = ({ id }) =>
  http.get(`https://merncrudblogs.herokuapp.com/posts/${id}`);

//Deleting post data by id
export const DeletePostById = ({ id }) =>
  http.delete(`https://merncrudblogs.herokuapp.com/posts/${id}`);

//adding data
export const AddNewPosts = ({ data }) =>
  http.post(`https://merncrudblogs.herokuapp.com/posts`, data);

//Edit post data
export const EditPostData = ({ id, data }) =>
  http.put(`https://merncrudblogs.herokuapp.com/posts/${id}`, data);

//Search post data

export const SearchPostData = ({ data }) =>
  http.post(`https://merncrudblogs.herokuapp.com/posts/search`, {
    search: data,
  });
