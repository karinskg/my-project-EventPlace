import { useEffect, useState } from 'react';
import EventTitle from '../components/EventTitle';
import EventCard from '../components/EventCard';
import Card from '../components/Card';
import CartLoader from '../components/CartLoader';
import CartLoaderRec from '../components/CartLoaderRec';
import dayjs from 'dayjs';

const Home = () => {
  const [activeBut, setActiveBut] = useState('All');
  const category = ['All', 'Music', 'Food', 'Art', 'Tech'];
  const [comingEventsApi, setComingEventsApi] = useState();

  useEffect(() => {
    const ComSonStart = `${dayjs().format('YYYY-MM-DD')}T00:00:00Z`;
    const ComSonEnd = `${dayjs().add(10, 'day').format('YYYY-MM-DD')}T00:00:00Z`;
    async function add() {
      // const res = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=2026-03-15T00:00:00Z&endDateTime=2026-03-20T00:00:00Z&apikey=BpvqSH8A8zdDv1ji3n1Hs5sQiPpDt77w')
      //https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=BpvqSH8A8zdDv1ji3n1Hs5sQiPpDt77w
      //https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=2026-03-15T00:00:00Z&endDateTime=2026-03-20T00:00:00Z&apikey=BpvqSH8A8zdDv1ji3n1Hs5sQiPpDt77w

      const commingSoonApi = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=${ComSonStart}&endDateTime=${ComSonEnd}&apikey=BpvqSH8A8zdDv1ji3n1Hs5sQiPpDt77w`,
      );

      const date = await commingSoonApi.json();
      setComingEventsApi(date._embedded.events);
      // console.log(date);
    }
    add();
  }, []);

  console.log(comingEventsApi)

  return (
    <>
      <EventTitle />

      <section className="comEvSec">
        <EventCard />
        <CartLoader />
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
        {category.map((el, id) => (
          <button
            key={id}
            className={`filter-btn ${activeBut === category[id] ? 'active' : ''}`}
            onClick={() => setActiveBut(el)}>
            {el}
          </button>
        ))}
      </div>

      <section className="recomend">
        <div className="card__el">
          <Card />
          <CartLoaderRec />
        </div>
      </section>
    </>
  );
};

export default Home;
