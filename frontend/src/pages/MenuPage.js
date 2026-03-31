import React, { useCallback, useEffect, useMemo, useState } from 'react';
import FilterSidebar from '../components/common/FilterSidebar';
import FoodCard from '../components/common/FoodCard';
import { useCart } from '../context/CartContext';
import useMealFilters from '../hooks/useMealFilters';
import mealService from '../services/mealService';
import socket from '../services/socket';

const initialFilters = {
  search: '',
  vegType: 'all',
  category: 'all',
  minRating: 1,
  maxPrice: 5000,
};

const MenuPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const { addToCart } = useCart();

  const loadMeals = useCallback(async (silent = false) => {
    try {
      if (!silent) {
        setLoading(true);
      }
      setError('');
      const response = await mealService.getMeals();
      setMeals(response);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (serviceError) {
      setError('Unable to load meals. Please refresh.');
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  useEffect(() => {
    const handleFoodsChanged = () => {
      loadMeals(true);
    };

    socket.connect();
    socket.on('foods:changed', handleFoodsChanged);

    return () => {
      socket.off('foods:changed', handleFoodsChanged);
      socket.disconnect();
    };
  }, [loadMeals]);

  useEffect(() => {
    const poller = setInterval(() => {
      loadMeals(true);
    }, 30000);
    return () => clearInterval(poller);
  }, [loadMeals]);

  const categories = useMemo(() => {
    return [...new Set(meals.map((meal) => meal.category))];
  }, [meals]);

  const priceRangeMax = useMemo(() => {
    const maxMealPrice = meals.reduce((max, meal) => Math.max(max, Number(meal.price) || 0), 0);
    return Math.max(500, Math.ceil(maxMealPrice / 10) * 10, filters.maxPrice);
  }, [meals, filters.maxPrice]);

  const filteredMeals = useMealFilters(meals, filters);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container section-space">
      <div className="section-title-wrap menu-title-row">
        <h2>Healthy Food Listing</h2>
        <p>Filter by diet, category, rating, and price. Live sync active. {lastUpdated ? `Last sync: ${lastUpdated}` : ''}</p>
        <button type="button" className="secondary-btn" onClick={() => loadMeals(true)}>
          Refresh Now
        </button>
      </div>

      <div className="menu-layout">
        <FilterSidebar
          filters={filters}
          categories={categories}
          priceRangeMax={priceRangeMax}
          onSearch={(value) => updateFilter('search', value)}
          onVegChange={(value) => updateFilter('vegType', value)}
          onCategoryChange={(value) => updateFilter('category', value)}
          onRatingChange={(value) => updateFilter('minRating', value)}
          onPriceChange={(value) => updateFilter('maxPrice', value)}
          onReset={() => setFilters(initialFilters)}
        />

        <div>
          {loading && <p className="status-note">Loading meals...</p>}
          {error && <p className="status-note error">{error}</p>}

          {!loading && !error && !filteredMeals.length && <p className="status-note">No meals match your filter.</p>}

          <div className="food-grid">
            {filteredMeals.map((meal) => (
              <FoodCard key={meal.id} meal={meal} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
