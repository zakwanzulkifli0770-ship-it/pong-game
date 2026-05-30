# To-Do List Application

A modern, feature-rich to-do list application with local storage functionality. All your tasks are saved automatically to your browser's local storage.

## Features

### ✨ Core Features
- ✅ **Add Tasks** - Quickly add new tasks with the input field
- ✅ **Mark Complete** - Check off tasks as you complete them
- ✅ **Edit Tasks** - Modify existing tasks with the edit button
- ✅ **Delete Tasks** - Remove individual tasks
- ✅ **Local Storage** - All tasks are automatically saved to your browser

### 🎯 Filtering
- **All** - View all tasks
- **Active** - See only incomplete tasks
- **Completed** - View finished tasks

### 📊 Statistics
- **Total Tasks** - Count of all tasks
- **Active Tasks** - Number of incomplete tasks
- **Completed Tasks** - Number of finished tasks

### 🔧 Additional Functions
- **Clear Completed** - Remove all completed tasks at once
- **Clear All** - Delete all tasks (with confirmation)
- **Timestamps** - Each task shows when it was created
- **Responsive Design** - Works on desktop and mobile devices

## How to Use

1. **Adding a Task**
   - Type your task in the input field
   - Click "Add Task" or press Enter

2. **Completing a Task**
   - Click the checkbox next to a task to mark it complete
   - Completed tasks will appear with a strikethrough

3. **Editing a Task**
   - Click the "Edit" button on any task
   - Modify the text in the modal dialog
   - Click "Save" or press Enter to confirm

4. **Deleting a Task**
   - Click the "Delete" button on any task
   - Confirm the deletion when prompted

5. **Filtering Tasks**
   - Use the filter buttons to view all, active, or completed tasks

6. **Bulk Actions**
   - "Clear Completed" - removes all finished tasks
   - "Clear All" - removes all tasks (with confirmation)

## Local Storage

Your tasks are automatically saved to your browser's local storage. This means:
- ✓ Tasks persist even after closing the browser
- ✓ No server or internet connection required
- ✓ Completely private - data stays on your device
- ✓ No account login needed

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (Vanilla)** - No frameworks or dependencies
- **LocalStorage API** - For data persistence

## File Structure

```
todo/
├── index.html      # HTML structure
├── style.css       # Styling and animations
└── script.js       # Application logic
```

## Browser Compatibility

Works on all modern browsers that support:
- ES6 JavaScript
- LocalStorage API
- CSS Flexbox and Grid

## Tips

- Click anywhere outside the edit modal to cancel editing
- Press Escape to close the edit modal
- Your data is safe in local storage - it won't be deleted unless you clear browser data
- Tasks are sorted by creation date (newest first)

Enjoy organizing your tasks! 📝