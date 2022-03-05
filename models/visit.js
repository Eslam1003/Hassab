const mongoose = require('mongoose');
const visitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNum1: {
      type: String,
      required: true,
    },
    phoneNum2: {
      type: String,
      required: true,
    },
    ragion: {
      type: String,
      required: true,
    },
    stname: {
      type: String,
      required: true,
    },
    blnum: {
      type: String,
      required: true,
    },
    flnum: {
      type: String,
      required: true,
    },
    donum: {
      type: String,
      required: true,
    },
    spchilmark: {
      type: String,
      required: true,
    },
    tests: {
      type: String,
      required: true,
    },
    time: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    creater: {
      type: String,
      required: true,
    },
    chimist: {
      type: String,
      required: true,
    },
    nots: {
      type: String,
      required: true,
    },
    cost: {
      type: String,
      required: true,
    },
    stat: {
      type: String,
      required: true,
    },
    aria: {
      type: String,
      required: true,
    },
    num: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Visit', visitSchema);
