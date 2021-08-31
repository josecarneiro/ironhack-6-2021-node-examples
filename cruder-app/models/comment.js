const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    publication: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Publication'
    },
    message: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 300
    }
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'editingDate'
    }
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
