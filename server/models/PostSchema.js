const { model, Schema } = require('mongoose');
const required = true;

const schemaPosts = Schema({
  title: { type: String, required },
  imageFileSet: {
    type: String,
    required,
  },
  publishedAt: { type: Date, default: Date.now() },
  description: {
    type: String,
    required,
  },
});

module.exports = model('posts', schemaPosts);
