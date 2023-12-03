const mongoose = require("mongoose") ;

const TodoSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: false, // NOT USE, but i need it 🤣
  },
  description: {
    type: String,
    required:false
  },
  completed: {
    type: Boolean,
    default: false,
    required:false
  },
  category: {
    type: String,
    required:false
  },
});

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;
