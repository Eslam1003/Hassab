const mongoose = require('mongoose');

const chimist = new mongoose.Schema(
  {
    chimist: {
      type: [String],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Chimist', chimist);
