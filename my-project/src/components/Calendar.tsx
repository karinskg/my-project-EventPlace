import dayjs, { Dayjs } from 'dayjs';

import React, { useEffect, useState } from 'react';


interface allDays {
  date: Dayjs;
  current: boolean;
}

const dayOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [fullCalendar, setFullCalendar] = useState<allDays[]>();

  const generateCalendar = () => {
    const firstDayOfMonth = currentMonth.startOf('month').day(); //31

    const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');

    const allDays = [];

    // 1. Добавляем прошлый месяц (серые)

    for (let i = 0; i < firstDayIndex; i++) {
      allDays.push({
        date: startOfMonth.subtract(firstDayIndex - i, 'day'),
        current: false,
      });
    }

    // 2. Добавляем текущий месяц
    for (let i = 1; i <= currentMonth.daysInMonth(); i++) {
      allDays.push({
        date: startOfMonth.date(i),
        current: true,
      });
    }

    // 3. Добавляем будущий месяц (дозабиваем до кратного 7 или до 35 ячеек)
    // const remainingSlots = 35 - allDays.length;
    // for (let i = 1; i <= remainingSlots; i++) {
    //   allDays.push({
    //     date: endOfMonth.add(i, 'day'),
    //     current: false,
    //   });
    // }

    if (currentMonth.endOf('month').day() != 0) {
      for (let i = 1; i < 8 - endOfMonth.day(); i++) {
        allDays.push({
          date: endOfMonth.add(i, 'day'),
          current: false,
        });
      }
    }

    setFullCalendar(allDays);
  };

  function changeMonth(type: string) {
    if (type === 'next') {
      setCurrentMonth(currentMonth.add(1, 'month'));
    } else {
      setCurrentMonth(currentMonth.subtract(1, 'month'));
    }
  }

 

  useEffect(() => {
    generateCalendar();
  }, [currentMonth]);

  return (
    <>
      <header className="calendar-header">
        <div className="calendar-header__title">
          <h1>{`${currentMonth.format('MMMM')} ${currentMonth.format('YYYY')}`}</h1>
          <div className="calendar-nav">
            <button className="filter-btn" onClick={() => changeMonth('prev')}>
              ❮
            </button>
            <button className="filter-btn" onClick={() => changeMonth('next')}>
              ❯
            </button>
          </div>
        </div>

        <div className="calendar-weekdays">
          {dayOfWeek.map((el, id) => (
            <div key={id}>{el}</div>
          ))}
        </div>
      </header>

      <div className="calendar-grid">
        {fullCalendar &&
          fullCalendar.map((item, idx) => (
            <div
              key={idx}
              className={`day-cell ${!item.current ? 'next-month' : ''} ${item.date.isSame(dayjs(), 'day') ? 'active' : ''}`}>
              {item.date.date()}
              {/* <div className='event-dots'>
              <span className='dot orange'></span>
            </div> */}
            </div>
          ))}
      </div>
    </>
  );
};

export default Calendar;
