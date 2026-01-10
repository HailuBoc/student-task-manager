import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Task Card Component
const SortableTaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date().setHours(0,0,0,0);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-card ${task.completed ? 'completed' : ''} ${isOverdue(task.dueDate) && !task.completed ? 'overdue' : ''}`}
    >
      <div className="task-content">
        <div className="task-header">
          <div className="task-drag-handle" {...attributes} {...listeners}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="12" r="1"></circle>
              <circle cx="9" cy="5" r="1"></circle>
              <circle cx="9" cy="19" r="1"></circle>
              <circle cx="15" cy="12" r="1"></circle>
              <circle cx="15" cy="5" r="1"></circle>
              <circle cx="15" cy="19" r="1"></circle>
            </svg>
          </div>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task._id)}
            className="task-checkbox"
          />
          <h3 className={`task-title ${task.completed ? 'completed-text' : ''}`}>
            {task.title}
          </h3>
          <span className={`priority-badge priority-${task.priority}`}>
            {task.priority}
          </span>
        </div>
        
        <p className={`task-description ${task.completed ? 'completed-text' : ''}`}>
          {task.description}
        </p>
        
        <div className="task-footer">
          <span className={`due-date ${isOverdue(task.dueDate) && !task.completed ? 'overdue' : ''}`}>
            📅 {formatDate(task.dueDate)}
            {isOverdue(task.dueDate) && !task.completed && ' (Overdue)'}
          </span>
          
          <div className="task-actions">
            <button 
              className="btn btn-sm btn-secondary"
              onClick={() => onEdit(task)}
            >
              Edit
            </button>
            <button 
              className="btn btn-sm btn-danger"
              onClick={() => onDelete(task._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function TaskList({ tasks, onEdit, onDelete, onToggleComplete, onReorder }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task._id === active.id);
      const newIndex = tasks.findIndex((task) => task._id === over.id);
      
      const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);
      onReorder(reorderedTasks);
    }
  }

  if (tasks.length === 0) {
    return null;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasks.map(task => task._id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="task-list">
          {tasks.map(task => (
            <SortableTaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default TaskList;
