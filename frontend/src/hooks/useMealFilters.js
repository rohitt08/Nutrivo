import { useMemo } from 'react';

const useMealFilters = (meals, filters) => {
  const filteredMeals = useMemo(() => {
    return meals.filter((meal) => {
      const searchMatch = meal.title.toLowerCase().includes(filters.search.toLowerCase());
      const vegMatch =
        filters.vegType === 'all' ||
        (filters.vegType === 'veg' && meal.veg) ||
        (filters.vegType === 'nonveg' && !meal.veg);
      const categoryMatch = filters.category === 'all' || meal.category === filters.category;
      const ratingMatch = meal.rating >= filters.minRating;
      const priceMatch = meal.price <= filters.maxPrice;

      return searchMatch && vegMatch && categoryMatch && ratingMatch && priceMatch;
    });
  }, [meals, filters]);

  return filteredMeals;
};

export default useMealFilters;
