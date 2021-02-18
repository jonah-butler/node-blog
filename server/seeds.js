const mongoose = require("mongoose");
const BlogModel = require("./models/blog.js");


let seeds = [

  {
    title: 'Test Title 2',
    text: 'This is some dummy data',
    categories: ['just', 'some', 'more', 'test']
  },
  {
    title: 'Test Title 3',
    text: 'This is some dummy data',
    categories: ['just', 'some', 'more', 'test']
  },
  {
    title: 'Test Title 4',
    text: 'This is some dummy data',
    categories: ['just', 'some', 'more', 'test']
  },
  {
    title: 'Test Title 5',
    text: 'This is some dummy data',
    categories: ['just', 'some', 'more', 'test']
  },
  {
    title: 'Test Title 6',
    text: 'This is some dummy data',
    categories: ['just', 'some', 'more', 'test']
  },
  {
    title: 'Test Title 7',
    text: 'This is some dummy data',
    categories: ['just', 'some', 'more', 'test']
  }

]

// const seedDb = async () => {
//   await BlogModel.deleteMany({});
//   for(const seed of seeds){
//     let blog = await BlogModel.create(seed);
//     console.log(blog);
//   }
// }

// module.exports = seedDb;
