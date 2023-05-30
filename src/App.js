import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        task: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id, task) => {
    setEditingId(id);
    setEditingValue(task);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editingId) {
        return {
          ...todo,
          task: editingValue
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditingId(null);
    setEditingValue('');
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span>{todo.task}</span>
            <div className="button-container">
              {!todo.completed && (
                <button
                  className="edit-button"
                  onClick={() => handleEditTodo(todo.id, todo.task)}
                >
                  Edit
                </button>
              )}
              <button
                className="delete-button"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
              <button
                className="toggle-button"
                onClick={() => handleToggleComplete(todo.id)}
              >
                {todo.completed ? '✓' : ''}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editingId && (
        <div className="edit-input-container">
          <input
            type="text"
            placeholder="Edit task"
            value={editingValue}
            onChange={(e) => setEditingValue(e.target.value)}
          />
          <button className="update-button" onClick={handleUpdateTodo}>
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
