import { foodAPI } from './api';

const mapApiMeal = (item) => ({
  id: item._id || item.id,
  title: item.title || item.name,
  category: item.category || item.catgeory || 'Protein Meals',
  price: Number(item.price) || 0,
  rating: Number(item.rating) || 4.3,
  veg: typeof item.veg === 'boolean' ? item.veg : Boolean(item.isVeg),
  calories: Number(item.calories) || 300,
  prepTime: item.prepTime || '20 min',
  image: item.imageUrl || item.image,
  description: item.description || 'Fresh and healthy meal crafted by expert chefs.',
  reviews: item.reviews || [],
});

export const mealService = {
  async getMeals() {
    try {
      const response = await foodAPI.search();
      const foods = response?.data?.foods || [];
      return foods.map(mapApiMeal);
    } catch (searchError) {
      const fallbackResponse = await foodAPI.getAll();
      const foods = fallbackResponse?.data?.foods || [];
      return foods.map(mapApiMeal);
    }
  },

  async getMealById(id) {
    try {
      const response = await foodAPI.getById(id);
      return mapApiMeal(response?.data?.food || {});
    } catch (error) {
      return null;
    }
  },

  async createMeal(data) {
    const payload = {
      title: data.title,
      description: data.description,
      price: Number(data.price),
      imageUrl: data.image,
      category: data.category,
      isVeg: data.veg,
      rating: Number(data.rating) || 4,
    };
    const response = await foodAPI.create(payload);
    return mapApiMeal(response?.data?.food || {});
  },

  async placeOrder(payload) {
    // API-ready structure for real backend integration.
    // Example: return api.post('/order/create', payload)
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      orderId: `HN-${Date.now().toString().slice(-6)}`,
      ...payload,
    };
  },
};

export default mealService;
