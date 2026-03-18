import { useEffect, useState } from 'react';
import EventTitle from '../components/EventTitle';
import EventCard from '../components/EventCard';
import Card from '../components/Card';
import CartLoader from '../components/CartLoader';
import CartLoaderRec from '../components/CartLoaderRec';
import dayjs from 'dayjs';
import { useAppDispatch, type RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const Home = () => {
  const [activeBut, setActiveBut] = useState('All');
  const category = ['All', 'Music', 'Sport'];
  const [inputKeyword, setInputKeyword] = useState('');
  const [startDate, setStartDate] = useState(() => dayjs().format('YYYY-MM-DD'));
  const [endtDate, setEndtDate] = useState('');
  const [filterVal, setFilterVal] = useState('Tomate');
  const [isEng, setIsEng] = useState(true);
  const { comingEvents, isLoading, error } = useSelector((state: RootState) => state.eventsApi);

  const dispatch = useAppDispatch();
  const options = [
    { label: 'Tomate', value: 1 },
    { label: 'Queso', value: 2 },
  ];

  

  const validation = (e) => {
    const input = e.target.value;
    const regex = /[а-яёА-ЯЁ]/;

    if (regex.test(input)) {
      setIsEng(false)
    } else {
     setIsEng(true)
    }
    setInputKeyword(input);
  };

  const events = comingEvents?.length !== 0 ? comingEvents : [];

  function submite() {
    if(isEng){
       console.log(inputKeyword, startDate, endtDate, filterVal, activeBut);
    }
   
  }

  useEffect(() => {
    async function add() {
      // const res = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=2026-03-15T00:00:00Z&endDateTime=2026-03-20T00:00:00Z&apikey=BpvqSH8A8zdDv1ji3n1Hs5sQiPpDt77w')
      //https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=BpvqSH8A8zdDv1ji3n1Hs5sQiPpDt77w
      //https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=2026-03-15T00:00:00Z&endDateTime=2026-03-20T00:00:00Z&apikey=BpvqSH8A8zdDv1ji3n1Hs5sQiPpDt77w
      // const commingSoonApi = await fetch(
      //   `https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=${ComSonStart}&endDateTime=${ComSonEnd}&apikey=BpvqSH8A8zdDv1ji3n1Hs5sQiPpDt77w`,
      // );
      // const date = await commingSoonApi.json();
      // setComingEventsApi(date._embedded.events);
      // console.log(date);
    }
    add();
  }, []);

  if (events.length === 0) return <p>No events found.</p>;

  return (
    <>
      <EventTitle />

      {isLoading ? (
        Array(2)
          .fill(null)
          .map((_, id) => <CartLoader key={id} />)
      ) : (
        <section className="comEvSec">
          {events?.map((el) => {
            return <EventCard key={el.id} el={el} />;
          })}
        </section>
      )}

      <div className="category-filters">
        {/* <button className="filter-btn" onclick="scrollTags(-1)">
          &#10094;
        </button>
        <button className="filter-btn" onclick="scrollTags(1)">
          &#10095;
        </button> */}
      </div>
      <h1 className="title_coming">Recommendations</h1>
      <div className="filterAp">
        <div className="category-filters">
          {category.map((el, id) => (
            <button
              key={id}
              className={`filter-btn ${activeBut === category[id] ? 'active' : ''}`}
              onClick={() => setActiveBut(el)}>
              {el}
            </button>
          ))}
          <div className="filter-groups">
            <input 
            style={!isEng ? {borderColor:'red'} : {}}
              value={inputKeyword}
              onChange={(e) => validation(e)}
              type="text"
              className="search-input"
              placeholder="Ключевое слово на англ."
            />
          </div>
          {!isEng && <p style={{ color: 'red' }}>Переведите на англ.яз</p>}

          <div className="date-group">
            <div className="date-input-wrapper">
              <label>С:</label>
              <input
                onChange={(e) => setStartDate(e.target.value)}
                className="custom-date"
                type="date"
                id="start"
                name="trip-start"
                value={startDate}
                min="2026-01-01"
                max="2026-12-31"
              />
            </div>

            <div className="date-input-wrapper">
              <label>По:</label>
              <input
                onChange={(e) => setEndtDate(e.target.value)}
                className="custom-date"
                type="date"
                id="end"
                name="trip-end"
                value={endtDate}
                min={startDate}
                max="2026-12-31"
              />
            </div>
          </div>

          <div className="event_title">
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
                <span className="filter-label">{filterVal || 'Выберите категорию'}</span>
                <svg
                  className="arrow-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              <select className="filter-real-select" onChange={(e) => setFilterVal(e.target.value)}>
                {options.map((el) => (
                  <option value={el.label} key={el.value}>
                    {el.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button className="filter-btn " disabled={!isEng} onClick={submite}>
          Найти
        </button>
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
