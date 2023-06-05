const { Blogs } = require("./db/Blogs");
const { User } = require("./db/User");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

const app = express();
app.use(express.json());
app.use(cors());

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Invalid token
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

// Register
const Joi = require("joi");

// Register
app.post("/register", async (req, res) => {
  try {
    const { error } = validateRegistration(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { name, email, password } = req.body;

    const OldUser = await User.findOne({ email });
    if (OldUser) {
      return res.status(409).send("User Already Exists");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

function validateRegistration(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
}
 

// Login
app.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    // Validate if user exists in the database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: "1h" });
      user.token = token;

      // Send response
      return res.status(200).json(user);
    }

    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

// Protected Route Example
app.get("/protected", authenticateToken, (req, res) => {
  // The user is authenticated, handle the protected route logic here
  res.send("Protected Route");
});

//profile
app.get('/profile', authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('name email');
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });

app.post('/logout', (req, res) => {
    // Perform any necessary cleanup or token invalidation
    // For simplicity, we'll just send a success response
    res.status(200).send('Logout successful');
});

//add a blog
app.post("/add-blog",authenticateToken, async (req, res) => {
  try {
    const { title, blog, token } = req.body;

    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const newBlog = await Blogs.create({
      name: user.name,
      title,
      blog,
    });

    res.status(201).json(newBlog);
  } catch (err) {
    console.log(err);
  }
});

// Function to get all blogs
const getAllBlogs = async () => {
  try {
    const blogs = await Blogs.find();
    return blogs;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch blogs");
  }
};

// Route to get all blogs
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await getAllBlogs();
    res.status(200).json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// Function to get blogs by user name
const getBlogsByUserName = async (userName) => {
  try {
    const blogs = await Blogs.find({ name: userName });
    return blogs;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch blogs by user");
  }
};

// Route to get blogs by user name
app.get("/blogs/user/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;
    const blogs = await getBlogsByUserName(userName);
    res.status(200).json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// Function to get blog by id
const getBlogByBlogId = async (id) => {
  try {
    const blog = await Blogs.findById(id);
    
    return blog;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch blog");
  }
}

// Route to get blog by blog id
app.get("/blogs/:title", async (req, res) => {
  try {
    const title = req.params.title; // Use req.params.title to access the parameter from the URL path
    const blog = await getBlogByBlogId(title);
    console.log(blog);
    res.status(200).json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(8080, () => {
  console.log("Server is running");
});
