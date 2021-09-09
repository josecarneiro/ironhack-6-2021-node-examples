const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // To be able to use geographic queries such as
  // "near" or "within" we need to store the position
  // in this format
  position: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{ type: Number }]
  }
});

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
