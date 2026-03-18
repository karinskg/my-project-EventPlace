import EventCard from '../components/EventCard';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../redux/store';
import CartLoader from '../components/CartLoader';
import dayjs from 'dayjs';
import { FetchEvents, filterSeeAll } from '../redux/feature/comEventApiSlice';
import { useEffect } from 'react';

const SeeAll = () => {
  const { comingEvents, isLoading, inputValRed, filtersComingEvent } = useSelector(
    (state: RootState) => state.eventsApi,
  );
  const page = useSelector((state: RootState) => state.eventsApi.page);

  const isSearch = inputValRed?.trim().length > 0;
  const events = isSearch ? filtersComingEvent : comingEvents;

  const dispatch = useAppDispatch();

  const ComSonStart = `${dayjs().format('YYYY-MM-DD')}T00:00:00Z`;
  const ComSonEnd = `${dayjs().add(10, 'day').format('YYYY-MM-DD')}T00:00:00Z`;

  useEffect(() => {
    if (isSearch) {
      dispatch(filterSeeAll());
    }
  }, [inputValRed]);

  

  const handlePageChange = () => {
    dispatch(
      FetchEvents({
        start: ComSonStart,
        end: ComSonEnd,
        page: page,
      }),
    );
  };

  function scrollTop() {
    const container = document.querySelector('.all-contaner');
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  const showButton = events && events.length > 20;

  return (
    <div className="all-contaner">
      <div className="seeAll-cart">
        {events.length > 0
          ? events.map((el) => <EventCard key={el.id} el={el} />)
          : !isLoading && <p>Ничего не найдено</p>}

        {isLoading &&
          Array(3)
            .fill(null)
            .map((_, i) => <CartLoader key={i} />)}
      </div>
      {showButton && (
        <button
          onClick={scrollTop}
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            padding: '10px 20px',
            borderRadius: '50%',
            backgroundColor: '#eb5757',
            color: 'white',
            cursor: 'pointer',
            zIndex: 1000,
            border: 'none',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          }}>
          ↑
        </button>
      )}
      {events.length > 0 && (
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
    </div>
  );
};

export default SeeAll;
