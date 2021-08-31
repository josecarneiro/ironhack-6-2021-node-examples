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
