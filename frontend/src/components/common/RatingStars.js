import React from 'react';

const RatingStars = ({ value }) => {
  const stars = Math.round(value);

  return (
    <div className="rating-stars" aria-label={`Rating ${value}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= stars ? 'star filled' : 'star'}>
          ★
        </span>
      ))}
      <span className="rating-value">{value.toFixed(1)}</span>
    </div>
  );
};

export default RatingStars;
