import React from 'react';

/**
 * CategoryFilters component for filtering notes by categories
 * 
 * @param {Array} categories - List of all available categories
 * @param {string|null} activeCategory - Currently selected category
 * @param {function} onCategoryChange - Handler for category selection changes
 */
const CategoryFilters = ({ categories, activeCategory, onCategoryChange }) => {
  // No categories to display
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="category-filters">
      <div 
        className={`category-chip ${activeCategory === null ? 'active' : ''}`}
        onClick={() => onCategoryChange(null)}
      >
        All
      </div>
      
      {categories.map((category, index) => (
        <div
          key={index}
          className={`category-chip ${activeCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilters;
