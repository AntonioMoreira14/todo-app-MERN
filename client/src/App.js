import React, { useState, useEffect } from "react"

export default function App() {
  
  const [newInput, setNewInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
      fetch('/todos')
        .then(res => res.json())
        .then(data => { 
          let todolist = [];
          data.todos.forEach(todo => todolist.push(({id: todo._id, msg: todo.msg})))
          setTodos(todolist);
        } 
      )}, [newInput])

  function handleChange(e) {
    setNewInput(e.target.value)
  } 

  function addTodo() {
    if(!newInput) {
      return alert("Enter something on the box to put on the list!")
    }

    let postOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
				msg: newInput
			})
    }

    let postData = fetch('/todos', postOption)
    
    postData
      .then(res => res.json())
      setTodos(prevList => [...prevList, postData]);
      setNewInput("")
  }

  function deleteTodo(id) {

    let deleteOption = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: null
    }

    let deleteData =  fetch(`/todos/${id}`, deleteOption)
    
    deleteData.then(res => res.json()).then(() => { 
        const listTodos = todos.filter(todo => todo.id !== id)
        setTodos(listTodos)
    })
  }
 
  return (
    <div className="App">
      <h1 className="title">My Personal To Do List</h1>
      <hr className="todo-line"/>
      <section className="todo-body">
      <input 
        type="text"
        placeholder="Add a new to do..."
        value={newInput}
        onChange={handleChange}
        className="input-box"
        maxLength={50}
      />
      <button 
        className="input-button" 
        onClick={addTodo}>
        Add To Do
      </button>
      <ul>
        {todos.map(todo => {
          return (
            <li key={todo.id}>{todo.msg}
              <button 
                className="delete-btn" 
                onClick={() => deleteTodo(todo.id)}
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </li>
           )
        })}
        </ul>
      </section>
    </div>
  )
}

