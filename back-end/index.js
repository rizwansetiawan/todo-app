const express = require("express")
const mongoose = require("mongoose") ;
const bodyParser = require("body-parser")
const User = require("./models/modelUser")
const Todo = require("./models/modelTodo");
const authUser = require("./middleware/authUser");
const jwt = require("jsonwebtoken");
const cors = require("cors")
const app = express();
const PORT = 3000;
app.use(cors())
// const cors = require("cors")
// Menghubungkan ke MongoDB
mongoose.connect("mongodb://localhost:27017/todos");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors)

// Register (Sign Up)
app.post("/register", async (req, res) => {
    try {
      const { name, email, user_name, phone_number, password } = req.body;
  
      const existingUser = await User.findOne({ user_name });
  
      if (existingUser) {
        return res.status(400).json({ message: `User with this ${user_name} already exists` });
      }
  
      // Create a new user
      const newUser = new User({ name, email, user_name, phone_number, password });
      const savedUser = await newUser.save();
  
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.post("/login", async (req, res) => {
    try {
      const { user_name, password } = req.body;
      const user = await User.findOne({ user_name });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid user_name or password" });
      }
      const token = jwt.sign({ userId: user._id }, "todosApp", { expiresIn: "24h" });
      res.json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          user_name: user.user_name,
          phone_number: user.phone_number,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
// post Todos correct
app.post("/todos/title", authUser, async (req, res) => {
  try {
    const { title, } = req.body;

    // Cek apakah title sudah ada untuk pengguna dari user login
    const existingTodo = await Todo.findOne({ title:title, user: req.userId });

    if (existingTodo) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Jika kategori belum ada, tambahkan todo baru hehe
    const newTodo = new Todo({
      user: req.userId,
      title,

    });

    const savedTodo = await newTodo.save();
    res.status(201).json({ data: savedTodo, message: "Successfully created todo" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// post description based on title correct
app.post("/todos/description/:title", authUser, async (req, res) => {
  try {
    const { description, completed } = req.body;

    // Get the category based on title from the database
    const titleCategory = await Todo.findOne({ title: req.params.title, user: req.userId });

    // Ensure titleCategory is not null before using it
    if (!titleCategory) {
      return res.status(404).json({ message: "Title not found or unauthorized to create task" });
    }

    const newTodo = new Todo({
      user: req.userId,
      category: titleCategory.title, // Use the title from the database as the category
      completed,
      description,
      title: req.params.title, // Use the title from the route parameter
    });

    const savedTodo = await newTodo.save();
    res.status(201).json({ data: savedTodo, message: "Successfully created task" });
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).json({ error: error.message });
  }
});
  // update completed based on description correct
  app.put("/todos/description/:description/completed", authUser, async (req, res) => {
    try {
      const { completed } = req.body;
      const description = req.params.description;
  
      // Check if the todo exists and belongs to the authenticated user
      const existingTodo = await Todo.findOne({ description, user: req.userId });
  
      if (!existingTodo) {
        return res.status(404).json({ message: "Todo not found or unauthorized to update" });
      }
  
      // Update the completed field
      existingTodo.completed = completed;
  
      // Save the updated todo
      const updatedTodo = await existingTodo.save();
  
      res.status(200).json({ data: updatedTodo, message: "Successfully updated task" });
    } catch (error) {
      console.error({ error: error.message });
      res.status(500).json({ error: error.message });
    }
  });
  // get based on title correct
  app.get("/todos/title/:title", authUser, async (req, res) => {
    try {
      const search = req.params.title; // Use req.params.search for route parameters
      
  
      // Retrieve To-Do list based on the logged-in user's ID and category
      const todos = await Todo.find({ user: req.userId, title: search });
      if(todos.length === 0 ){
        return res.json({message:"title tidak di temukan"})
      }
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
// find based on description corect
app.get("/todos/description/:description", authUser, async (req, res) => {
  try {
    const searchText = req.params.description;
    const regex = new RegExp(searchText, 'i');
    
    const todos = await Todo.find({
      user: req.userId,
      description: { $regex: regex },
    });

    if (todos.length === 0) {
      return res.json({ message: "Task tidak ditemukan" });
    }
    
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


  // get all correct
  app.get("/todos", authUser, async (req, res) => {
    try {
      const userId = req.userId;
  
      const todos = await Todo.find({ user: userId });
  
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  // delete based on description correct
  app.delete("/todos/delete/:id", authUser, async (req, res) => {
    try {
      const id = req.params.id;
  
      const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: req.userId });
  
      if (!deletedTodo) {
        return res.status(404).json({ message: "To-Do not found or unauthorized to delete" });
      }
  
      res.json({message:"category deleted",data:deletedTodo});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // update to-do based on description correct 
  app.put("/todos/description/update/:description", authUser, async (req, res) => {
    try {
      const descriptionUpdate = req.params.description;
      const { description } = req.body;
  
      const updatedTodo = await Todo.findOneAndUpdate(
        { description: descriptionUpdate, user: req.userId },
        { description },
        { new: true }
      );
  
      if (!updatedTodo) {
        return res.status(404).json({ message: "To-Do tidak ditemukan" });
      }
  
      res.status(200).json({ data: updatedTodo, message: "Deskripsi To-Do berhasil diperbarui" });
    } catch (error) {
      console.error({ error: error.message });
      res.status(500).json({ error: error.message });
    }
  });
  // filter todo which description null 
  app.get("/todos/nonempty", authUser, async (req, res) => {
    try {
      const todos = await Todo.find({ description: { $exists: true, $ne: '' }, user: req.userId });
  
      res.status(200).json({ data: todos, message: "Todos retrieved successfully" });
    } catch (error) {
      console.error({ error: error.message });
      res.status(500).json({ error: error.message });
    }
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
