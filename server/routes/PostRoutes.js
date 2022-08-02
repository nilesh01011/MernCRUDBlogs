const express = require('express');
const {
  GetAllPosts,
  GetPostDetailsById,
  DeletePostById,
  UpdatePostDetailsById,
  AddPost,
  SearchBlogPost,
} = require('../controller/PostController');

const router = express.Router();

// declaring routes

router.get('/', GetAllPosts);

router.get('/:id', GetPostDetailsById);

router.delete('/:id', DeletePostById);

router.put('/:id', UpdatePostDetailsById);

router.post('/search', SearchBlogPost);

router.post('/', AddPost);

module.exports = router;
