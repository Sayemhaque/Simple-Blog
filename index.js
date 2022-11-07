const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const Post = require("./model/blogSchema");
const dotenv = require("dotenv")

dotenv.config()

const uri = process.env.MONGOURI;
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("connected to database");
    },
    (err) => {
      console.log(err);
    }
  );



// get all the posts
app.get("/", async (req, res) => {
  try {
    const all = await Post.find({});
    res.send(all);
  } catch (error) {
    console.log(error);
  }
});

// get single post
app.get("/posts/:id", async (req, res) => {
  try {
    const singlePost = await Post.findById({ _id: req.params.id });
    res.status(200).json(singlePost);
  } catch (error) {
    console.log(error);
  }
});

// add a new post to the database
app.post("/addpost", async (req, res) => {
  const {postId, title, author, body, imgUrl } = req.body;
  if (Boolean(title) && Boolean(author) && Boolean(body) && Boolean(imgUrl)) {
    try {
      const posts = new Post({
        postId,
        title,
        author,
        body,
        imgUrl,
      });
      await posts.save();
      res.status(200).json(req.body);
    } catch (error) {
      res.status(401).json({ error: "can't post " });
    }
  } else {
    res.status(401).json({ error: "please fullfill all the fields" });
  }
});

// update a existing post id
app.put("/posts/:id", async (req, res) => {
  try {
    await Post.updateOne({ _id: req.params.id }, req.body);
    res.status(201).json({ delete: "post deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

// delete a existing post with id
app.delete("/posts/:id", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(201).json({ delete: "post deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT , () => {
  console.log(`app is running on http://localhost:${PORT}`)
});

