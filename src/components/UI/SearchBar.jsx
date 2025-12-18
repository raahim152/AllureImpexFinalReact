import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const SearchBar = ({ onSearch, showFilters = true, placeholder = "Search products..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    featured: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const debounceTimeout = useRef(null);

  // Extract search params from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    setSearchTerm(q);
    
    // Set filters from URL
    setFilters({
      category: params.get('category') || '',
      subcategory: params.get('subcategory') || '',
      featured: params.get('featured') || '',
      sortBy: params.get('sortBy') || 'createdAt',
      sortOrder: params.get('sortOrder') || 'desc'
    });
  }, [location.search]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    
    // Clear previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    
    // Set new timeout for debouncing
    debounceTimeout.current = setTimeout(() => {
      updateURLWithSearch(value);
    }, 500); // 500ms debounce
  };

  const updateURLWithSearch = (searchValue) => {
    const params = new URLSearchParams();
    
    if (searchValue.trim()) {
      params.set('q', searchValue.trim());
    }
    
    // Add filters to URL
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    
    // Update URL
    navigate(`${location.pathname}?${params.toString()}`);
    
    // Call onSearch callback if provided
    if (onSearch) {
      onSearch(searchValue.trim(), filters);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateURLWithSearch(searchTerm);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      subcategory: '',
      featured: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    setSearchTerm('');
    navigate(location.pathname);
    
    if (onSearch) {
      onSearch('', {});
    }
  };

  const hasActiveFilters = searchTerm || 
    filters.category || 
    filters.subcategory || 
    filters.featured;

  return (
    <div className="search-container">
      <div className="search-bar">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={placeholder}
            className="search-input"
          />
          {searchTerm && (
            <button 
              onClick={() => handleSearch('')}
              className="clear-search-btn"
            >
              <FaTimes />
            </button>
          )}
        </div>
        
        {showFilters && (
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`filter-toggle-btn ${showAdvancedFilters ? 'active' : ''}`}
          >
            <FaFilter />
            Filters
          </button>
        )}
      </div>

      {showAdvancedFilters && (
        <div className="advanced-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label>Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                <option value="corrugated">Corrugated</option>
                <option value="flexible">Flexible</option>
                <option value="paper-core">Paper Core</option>
                <option value="biomass">Biomass</option>
                <option value="plastics">Plastics</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Featured</label>
              <select
                value={filters.featured}
                onChange={(e) => handleFilterChange('featured', e.target.value)}
                className="filter-select"
              >
                <option value="">All Products</option>
                <option value="true">Featured Only</option>
                <option value="false">Non-Featured</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="filter-select"
              >
                <option value="createdAt">Date Added</option>
                <option value="name">Name (A-Z)</option>
                {/* Add more sort options as needed */}
              </select>
            </div>

            <div className="filter-group">
              <label>Order</label>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className="filter-select"
              >
                <option value="desc">Newest/Descending</option>
                <option value="asc">Oldest/Ascending</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <div className="active-filters">
          <span className="filter-tag">
            Search: {searchTerm}
            <button onClick={() => handleSearch('')}>×</button>
          </span>
          
          {filters.category && (
            <span className="filter-tag">
              Category: {filters.category}
              <button onClick={() => handleFilterChange('category', '')}>×</button>
            </span>
          )}
          
          <button 
            onClick={clearFilters}
            className="clear-all-btn"
          >
            Clear All
          </button>
        </div>
      )}

      <style jsx>{`
        .search-container {
          margin: 2rem 0;
        }
        
        .search-bar {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .search-input-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-icon {
          position: absolute;
          left: 1rem;
          color: #666;
        }
        
        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #ffc61a;
        }
        
        .clear-search-btn {
          position: absolute;
          right: 0.5rem;
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
          padding: 0.5rem;
        }
        
        .filter-toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #f5f5f5;
          border: 2px solid #ddd;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .filter-toggle-btn.active,
        .filter-toggle-btn:hover {
          background: #ffc61a;
          border-color: #ffc61a;
          color: #000;
        }
        
        .advanced-filters {
          background: #f9f9f9;
          padding: 1.5rem;
          border-radius: 8px;
          margin-top: 1rem;
        }
        
        .filter-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .filter-group label {
          font-weight: 600;
          color: #333;
        }
        
        .filter-select {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
        }
        
        .active-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }
        
        .filter-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #e8f4ff;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
        }
        
        .filter-tag button {
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          font-size: 1rem;
        }
        
        .clear-all-btn {
          margin-left: auto;
          padding: 0.25rem 1rem;
          background: #ff6b6b;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;