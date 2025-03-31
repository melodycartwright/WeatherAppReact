//Save & view favorite locations
import React from "react";
import "./Favorites.css";

const Favorites = ({ favorites, onSelect, onRemove }) => {
  if (favorites.length === 0) return null;

  return (
    <div className="favorites-container">
      <h3>Favoritplatser</h3>
      <div className="favorites-list">
        {favorites.map((city, i) => (
          <div key={i} className="favorite-item">
            <button onClick={() => onSelect(city)}>{city}</button>
            <span onClick={() => onRemove(city)}>❌</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
