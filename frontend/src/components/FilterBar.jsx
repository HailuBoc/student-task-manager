import React from 'react';

function FilterBar({ filter, sortBy, onFilterChange, onSortChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="filter">Filter:</label>
        <select 
          id="filter"
          value={filter} 
          onChange={(e) => onFilterChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="sort">Sort by:</label>
        <select 
          id="sort"
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select"
        >
          <option value="createdAt">Date Created</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
