import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = () => {
  const navigation = useNavigate()
  return (
    <div className="card" onClick={()=> navigation('/cart-detail')}>
      <div className="card__image">
        <img src="./image/tim-schmidbauer-1tsJ1QP20W4-unsplash.jpg" alt="Elevate Conference" />

        <label className="like-button">
          <input type="checkbox" />
          <svg className="heart-icon" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </label>
      </div>

      <div className="card__content">
        <h3 className="card__title">Elevatdde: The Conference for Professional Growth</h3>

        <div className="card__footer">
          <div className="card__location">
            <span className="icon-pin">📍</span> Los Angeles
          </div>
          <div className="card__price">$30.00</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
