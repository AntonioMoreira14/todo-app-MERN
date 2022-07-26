const express = require ('express')
const router = express.Router()
const {getAllTodos, createTodo, deleteTodo} = require('../controllers/todos')

router.route('/').get(getAllTodos).post(createTodo);

router.route('/:id').delete(deleteTodo)

module.exports = router;
