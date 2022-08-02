const { isValidObjectId } = require('mongoose');
const PostSchema = require('../models/PostSchema');
const { validatePost } = require('../validators/PostValidator');

module.exports.GetAllPosts = async (req, res) => {
  const data = await PostSchema.find().sort({ _id: -1 });
  return res.status(201).send({ data });
};

module.exports.GetPostDetailsById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).send({ message: 'Invalid Object Id' });
  }
  const data = await PostSchema.findById({ _id: id });

  if (!data) {
    return res.status(404).send({ message: 'Post not found' });
  }

  return res.status(201).send({ data });
};

module.exports.DeletePostById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).send({ message: 'Invalid Object Id' });
  }
  const data = await PostSchema.findOneAndDelete({ _id: id });

  if (data.rowCount === 0) {
    return res.status(404).send({ message: 'Post not found for Delete' });
  }

  return res.status(201).send({ data });
};

module.exports.UpdatePostDetailsById = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  if (!isValidObjectId(id)) {
    return res.status(400).send({ message: 'Invalid Object Id' });
  }

  const { error, value } = validatePost({ body });

  if (error) {
    return res.status(400).send({ message: 'Invalid Form Data' });
  }

  const data = await PostSchema.findOneAndUpdate({ _id: id }, { ...value });

  if (!data) {
    return res.status(404).send({ message: 'No Data Found' });
  }

  return res.status(200).send({ data });
};

module.exports.AddPost = async (req, res) => {
  const { body } = req;

  //   validate data body

  const { error, value } = validatePost({ body });

  if (error) {
    return res.status(400).send({ error, message: 'Invalid Form Data' });
  }

  const newPosts = new PostSchema({ ...value });

  const posts = await newPosts.save();

  if (!posts) {
    return res.status(404).send({ message: 'Empty Posts Objects' });
  }

  res.status(200).send({ data: posts, message: 'Data Added Successfull...' });
};

module.exports.SearchBlogPost = async (req, res) => {
  const searchText = String(req.body.search).trim();

  //main part
  const posts = await PostSchema.find({
    $text: { $search: `${searchText}` },
  });

  res.status(200).json({ posts });
};
