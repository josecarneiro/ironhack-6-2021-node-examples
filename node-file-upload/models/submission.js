const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    receiver: {
      type: String,
      required: true
    },
    attachment: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
