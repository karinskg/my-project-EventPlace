import React from 'react';
import Weather from '../components/Weather';
import CartDetailLoader from '../components/CartDetailLoader';

const CardDetails = () => {
  return (
    <main className="travel-detail wrapper">
      

      <section className="container_info">
        <header className="trip-info">
          <h1 className="trip-name">Paris Adventure</h1>
          <div className="info-pills">
            <div className="info-pill">
              <img src="/assets/icons/location-mark.svg" alt="location" />
              <span>Paris, Lyon, Marseille</span>
            </div>
          </div>
        </header>

        <section className="gallery">
          <img
            src="./image/tim-schmidbauer-1tsJ1QP20W4-unsplash.jpg"
            alt="Gallery"
            className="gallery-img main"
          />
          <img
            src="./image/tim-schmidbauer-1tsJ1QP20W4-unsplash.jpg"
            alt="Gallery"
            className="gallery-img"
          />
          <img
            src="./image/tim-schmidbauer-1tsJ1QP20W4-unsplash.jpg"
            alt="Gallery"
            className="gallery-img"
          />
          <img src="img4.jpg" alt="Gallery" className="gallery-img" />
          <img src="img5.jpg" alt="Gallery" className="gallery-img" />
        </section>

        <section className="meta-row">
          <div className="chip-list">
            <span className="chip bg-blue">Adventure</span>
            <span className="chip bg-green">Culture</span>
          </div>
        </section>

        <div className="event-info-grid">
          <div className="info-item">
            <div className="info-icon calendar-bg">📅</div>
            <div className="info-text">
              <span className="main">10 December, 2023</span>
              <span className="sub">Tuesday, 4:00PM - 9:00PM</span>
            </div>
          </div>

          <Weather />

          <div className="event-description">
            <h3>About Event</h3>
            <p>
              Enjoy your favorite dishes and a lovely time with friends. Food from local trucks
              available.
            </p>
          </div>

          <button className="btn-primary-large">Buy Ticket $30.00</button>
        </div>
      </section>
    </main>
    // <CartDetailLoader/>
  );
};

export default CardDetails;
