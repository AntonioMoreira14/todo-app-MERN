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
    
    try {
        const delTodo = await Todo.findByIdAndDelete(req.params.id);
        
        res.status(200).json({delTodo});
    } catch (err) {
        res.status(404).json(err)
    }
}

module.exports = {
  getAllTodos,
  createTodo,
  deleteTodo
}