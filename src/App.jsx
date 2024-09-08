import { useEffect, useState } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {

  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('') 

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify(newList))
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  useEffect(() => {
    const localTodos = localStorage.getItem('todos')
  
    // If there are no todos in localStorage, initialize it as an empty array
    if (localTodos) {
      setTodos(JSON.parse(localTodos) || [])
    }
  }, [])

  return (

      <>
        <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
        <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos}/>
      </>
  )
}

export default App
