const Todo = require('../models/Todo')

const getAllTodos = async (req, res) => {
    const todos = await Todo.find({})
    res.status(200).json({todos})
}

const createTodo = async (req, res) => {
    const todo = await Todo.create(req.body)
    res.status(201).json({todo})
}

const deleteTodo = async (req, res) => {
    const {id:todoID} = req.params;
    const todo = await Todo.findByIdAndDelete({_id: todoID})
        .then(() => res.json('Post was deleted!'))
        .catch(err => res.status(404).json('Error: ' + err))
}

module.exports = {
  getAllTodos,
  createTodo,
  deleteTodo
}