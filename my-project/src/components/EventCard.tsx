import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';
import type { NewEvent } from '../types';
import { useAppDispatch, type RootState } from '../redux/store';
import { addFavourite, removeFavourite } from '../redux/feature/comEventApiSlice';
import { useSelector } from 'react-redux';

const EventCard = ({ el }: { el: NewEvent }) => {
  const navigation = useNavigate();
  const { favouriteEv } = useSelector((state: RootState) => state.eventsApi);

  const dispatch = useAppDispatch();
  const date = dayjs(el.date).format('DD MMMM').split(' ');
  const generateStableNum = (id: string) => {
    const charSum = id?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (charSum % 20) + 1;
  };
 
  const mainImage = el.images?.find((el) => el.height >= 500) || el.images?.[0];
  return (
    <>
      <div className="event-card" onClick={() => navigation(`/cart-detail/${el.id}`)}>
        <div className="event-card__image-wrapper">
          <img
            src={mainImage?.url || 'image/vladimir-anikeev-IM8ZyYaSW6g-unsplash.jpg'}
            alt="Conference"
            className="event-card__img"
          />

          <div className="event-card__date">
            <span className="day">{date[0]}</span>
            <span className="month">{date[1]}</span>
          </div>

          <div
            className="event-card__like "
            onClick={(e) => {
              e.stopPropagation();
              if (!favouriteEv[el.id]) {
                dispatch(addFavourite({ ...el }));
              } else {
                dispatch(removeFavourite(el.id));
              }
            }}>
            <svg className={`heart-icon ${favouriteEv[el.id] ? 'liked' : ''} `} viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>

        <div className="event-card__content">
          <h3 className="event-card__title">
            {el.name?.length > 40 ? el.name.slice(0, 40) + '...' : el.name}
          </h3>

          <div className="event-card__info">
            <div className="event-card__going">
              <span>+{generateStableNum(el.id)} Going</span>
            </div>

            <div className="event-card__location">
              <span className="icon">📍</span> {el.city || 'TBA'}
            </div>
          </div>

          <div className="event-card__price">{el.total ? `$${el.total}` : 'Price TBA'}</div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
