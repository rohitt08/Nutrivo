import React from 'react';

const QuantitySelector = ({ value, onDecrease, onIncrease }) => {
  return (
    <div className="quantity-selector">
      <button type="button" onClick={onDecrease} aria-label="Decrease quantity">
        -
      </button>
      <span>{value}</span>
      <button type="button" onClick={onIncrease} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
