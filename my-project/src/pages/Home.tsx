import React from 'react';
import EventTitle from '../components/EventTitle';
import EventCard from '../components/EventCard';
import Card from '../components/Card';
import CartLoader from '../components/CartLoader';
import CartLoaderRec from '../components/CartLoaderRec';

const Home = () => {
  return (
    <>
      <EventTitle />

      <section className="comEvSec">
        <EventCard />
        <CartLoader/>
      </section>

      <div className="category-filters">
        {/* <button className="filter-btn" onclick="scrollTags(-1)">
          &#10094;
        </button>
        <button className="filter-btn" onclick="scrollTags(1)">
          &#10095;
        </button> */}
      </div>

      <div className="event_title">
        <h1 className="title_coming">Recommendations</h1>

        <div className="filter-select-container">
          <div className="filter-visual-btn">
            <svg
              className="filter-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path d="M22 3H2l8 9v7l4 3v-10L22 3z" />
            </svg>
            <span className="filter-label">Фильтр</span>
            <svg
              className="arrow-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>

          <select className="filter-real-select">
            <option value="all">Все категории</option>
            <option value="music">Музыка</option>
            <option value="tech">IT и Технологии</option>
            <option value="art">Искусство</option>
            <option value="food">Еда и напитки</option>
          </select>
        </div>
      </div>

      <div className="category-filters">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Music</button>
        <button className="filter-btn">Food</button>
        <button className="filter-btn">Art</button>
        <button className="filter-btn">Tech</button>
      </div>

      <section className="recomend">
        <div className="card__el">
          <Card />
          <CartLoaderRec/>
        </div>
      </section>
    </>
  );
};

export default Home;
