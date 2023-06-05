const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true }
);

const Blogs = mongoose.model(
  'Blogs',
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    blog: {
      type: String,
      required: true,
    },
    likes:{
      type: Number,
      default: 0,
    }
  },
  "MediumBlog"
);

module.exports = { Blogs };
