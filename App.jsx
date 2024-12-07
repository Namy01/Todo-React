import { useState } from "react";
import "./styles.css";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title: newItem,
          completed: false,
        },
      ];
    });
    setNewItem("");
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id);
    });
  }

  function editTodo(id, newTitle) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, title: newTitle };
        }
        return todo;
      });
    });
  }

  function handleEdit(id) {
    const newTitle = prompt("Enter new title:");
    if (newTitle) {
      editTodo(id, newTitle);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item"></label>
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            type="text"
            id="item"
            placeholder="Add New Item"
          />
        </div>
        <button id ="add" className="btn"><span class="material-symbols-outlined">
add
</span></button>
      </form>
      <h1 className="header">Todo List</h1>
      <fieldset>
      <ul className="list">
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={e => toggleTodo(todo.id, e.target.checked)}
              />
              {todo.title}
            </label>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="btn btn-danger"
            >
              <span class="material-symbols-outlined">
delete
</span>
            </button>
            <button
              onClick={() => handleEdit(todo.id)}
              className="btn btn-warning"
            >
              <span class="material-symbols-outlined">
edit
</span>
            </button>
          </li>
        ))}
      </ul>
      </fieldset>
    </>
  );
}
