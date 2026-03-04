import React from 'react';

const Calendar = () => {
  
  return (
    <>
      <header className="calendar-header">
        <div className="calendar-header__title">
          <h1>November 2022</h1>
          <div className="calendar-nav">
            <button className="filter-btn">❮</button>
            <button className="filter-btn">❯</button>
          </div>
        </div>

        <div className="calendar-weekdays">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
      </header>

      <div className="calendar-grid">
        <div className="day-cell next-month">31</div>

        <div className="day-cell">01</div>
        <div className="day-cell">01</div>
        <div className="day-cell">01</div>
        <div className="day-cell">01</div>
      

        <div className="day-cell">
          02
          <div className="event-dots">
            <span className="dot orange"></span>
            <span className="dot green"></span>
          </div>
        </div>
        <div className="day-cell active">
          03
          <div className="event-dots">
            <span className="dot blue"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
