const express = require('express');
const app = express();
const todos = require('./routes/todos')
const connectDB = require('./db/connect')
require('dotenv').config()
const cors = require('cors')

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors())

// middleware
app.use(express.json())

//routes

app.use('/todos', todos)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening on port ${port}....`))
  } catch (error) {
    console.log(error)
  }
}

start();
