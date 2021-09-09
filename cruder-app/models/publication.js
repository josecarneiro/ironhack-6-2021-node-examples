const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 120
    },
    url: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    score: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: {
      createdAt: 'publishingDate',
      updatedAt: 'editingDate'
    }
  }
);

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;
