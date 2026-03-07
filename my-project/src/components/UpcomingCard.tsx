import { useState } from 'react';

const colors = ['yellow', 'blue', 'red'];
interface UpcomingCardProps {
  list: ps;
  isActive: boolean; 
  onToggle: () => void;
  updateTitle: (id: number, title: string) => void;
}
interface ps {
  id: number;
  date: string;
  title: string;
  time: string;
  other: string;
}

const UpcomingCard = ({ list, updateTitle,isActive,onToggle }: UpcomingCardProps) => {
  const { title, time, date, other, id } = list;

  const [randomColor] = useState(() => colors[Math.floor(Math.random() * colors.length)]); //создастя только при рендере компонента
  const [inputVal] = useState('');
  const [addOther, setAddOther] = useState(false);

  return (
    <div
      className={`upcoming-card ${randomColor}  ${isActive && 'active'}`}
      onClick={onToggle}>
      <div className="upcoming-card__header">
        <img src="starbucks.png" alt="Starbucks" className="brand-icon" />
        <span className="date">{date}</span>
      </div>
      <h4 className="upcoming-card__title">{title}</h4>
      <div className="upcoming-card__block">
        <p className="upcoming-card__time">{time}</p>
        <button
          className={`upcoming-card__btn`}
          onClick={(e) => {
            e.stopPropagation();
            setAddOther(!addOther);
          }}>
          {addOther ? 'Save' : 'Change'}
        </button>
      </div>

      {/* появление инпута */}
      {addOther && (
        <div className={`input-container visible`}>
          <input
            value={other.length !== 0 ? other : inputVal}
            onChange={(e) => updateTitle(id, e.target.value)}
            type="text"
            className="modern-input"
            placeholder="Add details..."
            autoFocus={addOther}
            onClick={(e) => e.stopPropagation()} // Чтобы клик в инпут не закрывал карточку
          />
        </div>
      )}

      {other.length !== 0 && !addOther && <p className="other-text">{other}</p>}
    </div>
  );
};

export default UpcomingCard;
