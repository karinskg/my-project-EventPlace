import React, { useState } from 'react';
import UpcomingCard from './UpcomingCard';

type SingleEvent = {
  id: number;
  date: string;
  title: string;
  time: string;
  other: string;
};

interface UpcomingPanelProps {
  event: SingleEvent[];
  setEvent: React.Dispatch<React.SetStateAction<SingleEvent[]>>;
}

const UpcomingPanel = ({ event, setEvent }: UpcomingPanelProps) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  function updateTitle(id: number, newTitle: string) {
    setEvent((prev) => prev.map((el) => (el.id === id ? { ...el, other: newTitle } : el)));
  }

  return (
    <aside className="upcoming-panel">
      <h2 className="upcoming-panel__title">Upcoming</h2>

      <div className="upcoming-section">
        <h3 className="upcoming-section__date">Today</h3>
        {/* blue,yellow,red */}
        {event.map((el) => (
          <UpcomingCard
            key={el.id}
            list={el}
            updateTitle={updateTitle}
            isActive={activeId === el.id}
            onToggle={() => setActiveId(activeId === el.id ? null : el.id)}
          />
        ))}
      </div>

      <div className="upcoming-section">
        <h3 className="upcoming-section__date">Tomorrow</h3>
      </div>
    </aside>
  );
};

export default UpcomingPanel;
