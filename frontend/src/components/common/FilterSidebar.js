import React from 'react';

const FilterSidebar = ({
  filters,
  categories,
  priceRangeMax,
  onSearch,
  onVegChange,
  onCategoryChange,
  onRatingChange,
  onPriceChange,
  onReset,
}) => {
  return (
    <aside className="filter-panel">
      <h3>Filters</h3>

      <label className="filter-label" htmlFor="search-meals">
        Search
      </label>
      <input
        id="search-meals"
        type="text"
        value={filters.search}
        placeholder="Search healthy meals"
        onChange={(event) => onSearch(event.target.value)}
      />

      <label className="filter-label" htmlFor="veg-filter">
        Veg / Non-Veg
      </label>
      <select id="veg-filter" value={filters.vegType} onChange={(event) => onVegChange(event.target.value)}>
        <option value="all">All</option>
        <option value="veg">Veg</option>
        <option value="nonveg">Non-Veg</option>
      </select>

      <label className="filter-label" htmlFor="category-filter">
        Category
      </label>
      <select id="category-filter" value={filters.category} onChange={(event) => onCategoryChange(event.target.value)}>
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label className="filter-label" htmlFor="rating-filter">
        Minimum Rating: {filters.minRating}
      </label>
      <input
        id="rating-filter"
        type="range"
        min="1"
        max="5"
        step="0.5"
        value={filters.minRating}
        onChange={(event) => onRatingChange(Number(event.target.value))}
      />

      <label className="filter-label" htmlFor="price-filter">
        Max Price: ₹{filters.maxPrice}
      </label>
      <input
        id="price-filter"
        type="range"
        min="0"
        max={priceRangeMax}
        step="10"
        value={filters.maxPrice}
        onChange={(event) => onPriceChange(Number(event.target.value))}
      />

      <button type="button" className="secondary-btn" onClick={onReset}>
        Reset Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
