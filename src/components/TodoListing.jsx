import { useEffect, useState } from 'react';
import { ENDPOINTS } from '../constant/endUrls';
import AddEditTodoForm from './AddEditTodoForm';

const statusList = ['Pending', 'In Progress', 'Completed'];

const TodoListing = () => {
  const [todos, setTodos] = useState([]);
  const [draggedTodo, setDraggedTodo] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch todos from the API when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(ENDPOINTS.TODOSLIST);
        const data = await response.json();
        if (response.ok) {
          const updatedTodos = data.todos.map(todo => ({
            ...todo,
            status: todo?.completed ? 'Completed' : 'Pending',
          }));
          setTodos(updatedTodos);
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchTodos();
  }, []);

  // Handle drag start event to set the dragged todo
  const handleDragStart = (todo) => {
    setDraggedTodo(todo);
  };
  
  // Handle drop event to update the status of the dragged todo
  const handleDrop = (status) => {
    if (draggedTodo) {
      setTodos(prev =>
        prev.map(t =>
          t.id === draggedTodo.id ? { ...t, status } : t
        )
      );
      setDraggedTodo(null);
    }
  };

  // Allow drop event to prevent default behavior
  const allowDrop = (e) => {
    e.preventDefault();
  };

  // Handle delete todo action
  const handleDeleteTodo = (todo) => {
    setTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id));
    if (editTodo && editTodo.id === todo.id) {
      setEditTodo(null);
      setToggle(false);
    }
  }

  return (
    <div className="todo-wrapper">
      <button onClick={() => setToggle(!toggle)} className={`add-btn ${toggle ? 'close' : 'open'}`}>
        {toggle ? 'Close' : '+ Add Todo'}
      </button>

      {toggle && (
        <AddEditTodoForm
          setTodos={setTodos}
          todo={editTodo}
          onCancel={() => {
            setToggle(false);
            setEditTodo(null);
          }}
        />
      )}
      {!isLoading ?
        <div className="board-scroll">
          {statusList.map(status => (
            <div
              key={status}
              className="status-column"
              onDrop={() => handleDrop(status)}
              onDragOver={allowDrop}
            >
              <h3>{status}</h3>
              {todos
                .filter(todo => todo.status === status)
                .map(todo => (
                  <div
                    key={todo.id}
                    draggable
                    onDragStart={() => handleDragStart(todo)}
                    className="todo-card"
                  >
                    <h5>{todo.todo}</h5>
                    <p>{todo.description}</p>

                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditTodo(todo);
                        setToggle(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                      {handleDeleteTodo(todo);}
                      }
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          ))}
        </div> : <p>...Loading</p>}
    </div>
  );
};

export default TodoListing;
