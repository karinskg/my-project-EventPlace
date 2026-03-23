import { useSelector } from 'react-redux';
import { type RootState } from '../redux/store';
import EventCard from '../components/EventCard';
import { useMemo } from 'react';

const Favourite = () => {
  const { favouriteEv, inputValRed } = useSelector(
    (state: RootState) => state.eventsApi
  );

  const events = useMemo(() => {
    
    const eventsArray =
      Object.keys(favouriteEv).length !== 0
        ? Object.entries(favouriteEv).map(([id, data]) => ({
            id,
            ...data,
          }))
        : [];

    const searchTerm = inputValRed.toLowerCase();
    return eventsArray.filter((el) => el.name?.toLowerCase().includes(searchTerm));
  }, [favouriteEv, inputValRed]);

  return (
    <>
      <h1 className="title_coming" style={{ marginBottom: '1rem' }}>
        Favourites
      </h1>

      <div className="seeAll-cart">
        {events.length > 0 ? (
          events.map((el) => <EventCard key={el.id} el={el} />)
        ) : (
          <p>No likes events found.</p>
        )}
      </div>
    </>
  );
};

export default Favourite;
