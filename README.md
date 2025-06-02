Add commentMore actions
This is a lightweight Kanban-style Todo app built using React with features like:

- Add / Edit / Delete Todos
- Drag & Drop to change status (`Pending`, `In Progress`, `Completed`)
## Add/Edit Functionality:
1) A single form handles both adding and editing todos.
2) When editing, it pre-fills the form using useEffect based on the passed todo prop.
3) Submitting the form updates the todos list accordingly (update or append).

## Drag-and-Drop Support:
1) Implements drag-and-drop to change the status of a todo (e.g., from "Pending" to "Completed").
2) handleDragStart, handleDrop, and allowDrop manage this interaction.

## Status-Based Categorization:
1) Todos are grouped and rendered under columns for each status: Pending, In Progress, and Completed.

## Edit and Delete Options:
1) Each todo card includes buttons for editing or deleting.
2) Editing reuses the form with the selected todo's data.
3) Deleting removes the todo and resets the form if that todo was being edited.

## API Integration:
On component mount, todos are fetched from an API (ENDPOINTS.TODOSLIST), then mapped to add a human-readable status.

## Setup Instructions
Clone the repo:

git clone https://github.com/anupkumar222/todo-kanban-board.git
cd todo-kanban

npm install
npm start

---