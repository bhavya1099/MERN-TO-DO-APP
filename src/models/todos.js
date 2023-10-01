const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const Todo = new mongoose.Schema({
  userId: ObjectId,
  todos: [
    {
      //checked: Boolean,
      text: String,
      completed: Boolean,
    },
  ],
});

module.exports = mongoose.model("Todo", Todo);
