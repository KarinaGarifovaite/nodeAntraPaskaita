const mongoose = require("mongoose");

let ToDoSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },

  done: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

let ToDo = mongoose.model("ToDo", ToDoSchema);


module.exports = ToDo;