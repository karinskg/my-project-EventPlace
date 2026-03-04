import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = () => {
  const navigation = useNavigate()
  return (
    <div className="event-card" onClick={()=> navigation('/cart-detail')}>
      <div className="event-card__image-wrapper">
        <img
          src="./image//tim-schmidbauer-1tsJ1QP20W4-unsplash.jpg"
          alt="Conference"
          className="event-card__img"
        />

        <div className="event-card__date">
          <span className="day">10</span>
          <span className="month">JUNE</span>
        </div>

        <label className="event-card__like">
          <input type="checkbox" />
          <svg className="heart-icon" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </label>
      </div>

      <div className="event-card__content">
        <h3 className="event-card__title">Elevate: The Conference for Professional Growth</h3>

        <div className="event-card__info">
          <div className="event-card__going">
            <div className="avatar-group">
              <img src="user1.jpg" alt="" />
              <img src="user2.jpg" alt="" />
            </div>
            <span>+20 Going</span>
          </div>

          <div className="event-card__location">
            <span className="icon">📍</span> Los Angeles
          </div>
        </div>

        <div className="event-card__price">$30.00</div>
      </div>
    </div>
  );
};

export default EventCard;
