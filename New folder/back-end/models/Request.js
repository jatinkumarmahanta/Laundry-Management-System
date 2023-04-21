const mongoose = require("mongoose");

const { Schema } = mongoose;

const requestSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  top: {
    type: Number,
    required: true,
  },
  bottom: {
    type: Number,
    required: true,
  },
  woolen: {
    type: Number,
    required: true,
  },
  other: {
    type: Number,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  person: {
    type: String,
    required: true,
  },
  disc: {
    type: String,
  },
  authToken: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "approved", "finished"],
    default: "pending",
  },
});

module.exports = mongoose.model("Request", requestSchema);
