import { useRef, useState } from 'react';
import EventTitle from '../components/EventTitle';
import EventCard from '../components/EventCard';
import CartLoader from '../components/CartLoader';
import { useAppDispatch, type RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { Fetch } from '../redux/feature/comEventApiSlice';

const options = [
  { label: 'name(asc)', value: 'name,asc' },
  { label: 'name(desc)', value: 'name,desc' },
  { label: 'date(asc)', value: 'date,asc' },
  { label: 'date(desc)', value: 'date,desc' },
];

const Home = () => {
  const [activeBut, setActiveBut] = useState('Music');
  const category = ['Music', 'Sport', 'All'];
  const [inputKeyword, setInputKeyword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endtDate, setEndtDate] = useState('');
  const [filterVal, setFilterVal] = useState<string>();
  const [isEng, setIsEng] = useState(true);
  const { comingEvents, isLoadingCom, errorCom, allEvents, isLoadingAllEv, pageAllEv } =
    useSelector((state: RootState) => state.eventsApi);

  const dispatch = useAppDispatch();
 

  const validation = (e) => {
    const input = e.target.value;
    const regex = /[а-яёА-ЯЁ]/;

    if (regex.test(input)) {
      setIsEng(false);
    } else {
      setIsEng(true);
    }
    setInputKeyword(input.trim());
  };

  function submite() {
    if (isEng) {
      const sort = options.find((el) => el.label === filterVal);

      const classification = activeBut === 'All' ? undefined : activeBut;
      dispatch(
        Fetch({
          start: startDate,
          end: endtDate,
          sort: sort?.value,
          keyword: inputKeyword,
          classificationName: classification,
        }),
      );
      setInputKeyword('');
    }
  }

  const handlePageChange = () => {
    dispatch(
      Fetch({
        other: true,
        page: pageAllEv,
      }),
    );
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTags = (direction: number) => {
    if (scrollRef.current) {
     
      const scrollAmount = scrollRef.current.clientWidth * 0.8;

      scrollRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const events = comingEvents?.length !== 0 ? comingEvents : [];

  const allevents = allEvents?.length !== 0 ? allEvents : [];


  return (
    <>
      <EventTitle />

      {isLoadingCom ? (
        Array(2)
          .fill(null)
          .map((_, id) => <CartLoader key={id} />)
      ) : (
        <section className="comEvSec" ref={scrollRef}>
          {events?.map((el) => {
            return <EventCard key={el.id} el={el} />;
          })}
        </section>
      )}

      <div className="category-filters">
        <button className="filter-btn" onClick={() => scrollTags(-1)}>
          &#10094;
        </button>
        <button className="filter-btn" onClick={() => scrollTags(1)}>
          &#10095;
        </button>
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
              style={!isEng ? { borderColor: 'red' } : {}}
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

              <select
                className="filter-real-select"
                onChange={(e) => {
                  setFilterVal(e.target.value);
                }}>
                <option value="">-- Выберите категорию --</option>
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
        {allevents.length === 0 && !isLoadingAllEv ? (
          <p>По данному запросу ничего не найдено измените поиск</p>
        ) : null}
        <div className="seeAll-cart">
          {allevents.length > 0 && allevents.map((el) => <EventCard key={el.id} el={el} />)}

          {isLoadingAllEv && <p>loading...</p>}
        </div>

        {allevents.length > 0 && (
          <div
            style={{
              marginTop: '3rem',
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer',
            }}>
            <p onClick={handlePageChange}>Загрузить еще</p>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
