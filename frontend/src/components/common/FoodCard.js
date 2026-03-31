import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

const FoodCard = ({ meal, onAddToCart }) => {
  return (
    <article className="food-card">
      <Link to={`/meal/${meal.id}`} className="food-image-link" aria-label={meal.title}>
        <img src={meal.image} alt={meal.title} className="food-image" />
      </Link>

      <div className="food-content">
        <div className="food-headline">
          <h3>{meal.title}</h3>
          <p className="food-price">₹{meal.price}</p>
        </div>

        <p className="food-category-pill">{meal.category}</p>
        <RatingStars value={meal.rating} />

        <div className="food-actions">
          <Link to={`/meal/${meal.id}`} className="link-btn">
            View Details
          </Link>
          <button type="button" className="primary-btn" onClick={() => onAddToCart(meal, 1)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default FoodCard;
