import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import QuantitySelector from '../components/common/QuantitySelector';
import RatingStars from '../components/common/RatingStars';
import { useCart } from '../context/CartContext';
import mealService from '../services/mealService';

const FoodDetailsPage = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadMeal = async () => {
      setLoading(true);
      const result = await mealService.getMealById(id);
      setMeal(result || null);
      setLoading(false);
    };

    loadMeal();
  }, [id]);

  if (loading) {
    return (
      <section className="container section-space">
        <p className="status-note">Loading meal details...</p>
      </section>
    );
  }

  if (!meal) {
    return (
      <section className="container section-space">
        <h2>Meal not found</h2>
        <Link to="/menu" className="link-btn">
          Back to Menu
        </Link>
      </section>
    );
  }

  const addToCartWithQty = () => {
    if (quantity <= 0) return;
    addToCart(meal, quantity);
  };

  return (
    <section className="container section-space">
      <div className="details-layout">
        <img src={meal.image} alt={meal.title} className="details-image" />

        <div className="details-content">
          <h2>{meal.title}</h2>
          <p className="details-price">₹{meal.price}</p>
          <RatingStars value={meal.rating} />
          <p className="details-meta">
            Category: {meal.category} | Calories: {meal.calories} kcal | Prep: {meal.prepTime}
          </p>
          <p>{meal.description}</p>

          <div className="details-actions">
            <QuantitySelector
              value={quantity}
              onDecrease={() => setQuantity((value) => Math.max(0, value - 1))}
              onIncrease={() => setQuantity((value) => value + 1)}
            />
            <button 
              type="button" 
              className="primary-btn" 
              onClick={addToCartWithQty}
              disabled={quantity <= 0}
            >
              Add {quantity > 0 ? quantity : 0} to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="reviews-block">
        <h3>Reviews</h3>
        {meal.reviews.length ? (
          meal.reviews.map((review, index) => (
            <article key={`${review.name}-${index}`} className="review-card">
              <div className="review-row">
                <strong>{review.name}</strong>
                <span>{review.rating}/5</span>
              </div>
              <p>{review.comment}</p>
            </article>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </section>
  );
};

export default FoodDetailsPage;
