const mongoose = require('mongoose');
const PostSchema = require('./posts');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');

  BlogPost.remove({ _id: {  $in: this.blogPosts} })
    .then(() => next());

});

const User = mongoose.model('user', UserSchema);

module.exports = User;