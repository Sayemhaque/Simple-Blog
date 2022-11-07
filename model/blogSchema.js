const mongoose =  require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  postId: String,
  title:  String, // String is shorthand for {type: String}
  author: String,
  body:   String,
  imgUrl: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', blogSchema)