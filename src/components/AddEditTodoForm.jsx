import { useEffect, useState } from 'react';

const AddEditTodoForm = ({ setTodos, todo, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // set initial values for title and description if editing a todo
  useEffect(() => {
    if (todo) {
      setTitle(todo.todo || '');
      setDescription(todo.description || '');
    }
  }, [todo]);

  // handle form submission for adding or editing a todo
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      todo: title.trim(),
      description: description.trim(),
      status: todo?.status || 'Pending',
    };

    if (todo) {
      setTodos(prevTodos =>
        prevTodos.map(t => (t.id === todo.id ? { ...t, ...newTodo } : t))
      );
    } else {
      setTodos(prevTodos => [
        ...prevTodos,
        { ...newTodo, id: Date.now() }
      ]);
    }

    onCancel();
    setDescription('');
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>{todo ? 'Edit Todo' : 'Add Todo'}</h2>

      <div className="form-group">
        <label htmlFor="todo-title">Title</label>
        <input
          type="text"
          id="todo-title"
          name="todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="todo-description">Description</label>
        <input
          type="text"
          id="todo-description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button type="submit" className="button-save">Save</button>
        <button type="button" className="button-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default AddEditTodoForm;
