const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
  content: String,
  user: { type: ObjectId, ref: 'user' }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;