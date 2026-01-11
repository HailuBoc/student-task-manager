import React, { useState, useEffect } from 'react';
import { taskAPI } from './api';
import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import EditModal from './components/EditModal';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchTasks();
    // Apply dark mode on component mount
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
      document.documentElement.classList.add('dark-mode');
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [tasks, filter, sortBy, searchTerm]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getAll();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...tasks];

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filter === 'pending') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }

    // Apply sort
    filtered.sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredTasks(filtered);
  };

  const handleAddTask = (newTask) => {
    // Add the new task to the tasks array
    setTasks(prevTasks => [newTask, ...prevTasks]);
    // The form will handle closing itself after success
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const response = await taskAPI.update(id, taskData);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskAPI.delete(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleComplete = async (id) => {
    const task = tasks.find(t => t._id === id);
    if (task) {
      await handleUpdateTask(id, { completed: !task.completed });
    }
  };

  const handleReorderTasks = async (reorderedTasks) => {
    // Update local state immediately for better UX
    setTasks(reorderedTasks);
    
    // Optional: You could persist the new order to the backend
    // For now, we'll just keep it in the local state
  };

  return (
    <div className="App">
      <Header onAddTask={() => setShowAddForm(true)} />
      
      <main className="main-content">
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <FilterBar 
          filter={filter}
          sortBy={sortBy}
          onFilterChange={setFilter}
          onSortChange={setSortBy}
        />
        
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList 
            tasks={filteredTasks}
            onEdit={setEditingTask}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
            onReorder={handleReorderTasks}
          />
        )}
        
        {!loading && filteredTasks.length === 0 && (
          <div className="empty-state">
            <p>No tasks found. Click "Add Task" to create your first task!</p>
          </div>
        )}
      </main>

      {showAddForm && (
        <AddTaskForm
          onSubmit={handleAddTask}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingTask && (
        <EditModal
          task={editingTask}
          onSubmit={handleUpdateTask}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

export default App;
