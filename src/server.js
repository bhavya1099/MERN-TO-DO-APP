const express = require("express");
const dotenv = require("dotenv");

const User = require("./models/user");
const Todo = require("./models/todos");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");

const result = dotenv.config();
if (result.error) {
  console.log(result);
  throw result.error;
}
const { parsed: envs } = result;
const db_url = envs.DB_URL;
console.log(db_url);
const ObjectId = require("mongoose").Types.ObjectId;
const app = express();
//mongodb://localhost:27017/loginDemo
mongoose
  .connect("mongodb://localhost:27017/loginDemo", { useNewUrlParser: true })
  .then(() => {
    console.log(" in auth demo");
  })
  .catch((err) => {
    console.log("mongo connection error!");
    console.log(err);
  });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("response", res);
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = await User.findOne({ username }).exec();
  console.log("user post register", user);
  if (user) {
    res.status(500);
    res.json({
      message: "user already exists",
    });
    return;
  }
  console.log("request", req.body);
  await User.create({ username, password: hash });
  res.json({ message: "success" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("username password in login", username, password);
  const user = await User.findOne({ username });
  console.log("user in post login", user);
  if (user !== null) {
    const validPassword = await bcrypt.compare(password, user.password);
    console.log("valid password", validPassword);
    if (validPassword) {
      res.json({ message: "User found" });
      return;
    } else {
      res.status(403);
      res.json({ message: "Password incorrect!" });
      return;
    }
  }
  res.status(403);
  res.json({ message: "User not found!" });
});

app.post("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosItems = req.body;
  const user = await User.findOne({ username });
  console.log("user in post", user);
  let validPassword;
  if (user !== null)
    validPassword = await bcrypt.compare(password, user.password);
  if (!user || !validPassword) {
    console.log("valid password in post", validPassword);
    res.status(403);
    res.json({ message: "Password incorrect!" });
    return;
  }

  const todos = await Todo.findOne({
    userId: user._id,
  }).exec();
  console.log("todosItem in post", todosItems);
  console.log("todos", todos);
  if (!todos) {
    await Todo.create({
      userId: user._id,
      todos: todosItems,
    });
  } else {
    if (todosItems.length !== 0) {
      todos.todos = todosItems;
      console.log("todos in else ", todos);
      await todos.save();
    }
  }

  //console.log("res . json", res.json(todosItems));
  res.json(todosItems);
});

app.get("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosItems = req.body;
  const user = await User.findOne({ username });
  console.log("user", user);

  if (user) {
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      res.status(403);
      res.json({
        message: "invalid access",
      });
      return;
    }
  } else if (!user) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }

  const resp = await Todo.findOne({
    userId: user._id,
  }).exec();
  console.log("todos in get", resp);
  if (resp === null) {
    res.status(403);
    res.json({ message: "No Todos available!" });
  } else {
    res.json(resp.todos);
  }
});

app.listen(2000, () => {
  console.log("hello world");
});
