import React, { useState } from 'react';
import NoteSection from '../components/NoteSection';
import UpcomingPanel from '../components/UpcomingPanel';
import Calendar from '../components/Calendar';
import Toast from '../components/Toast';

const Event = () => {
  const [isToast, setIsToast] = useState(false);
  const [event, setEvent] = useState([
    {
      id: 1,
      date: 'Nov 01, 2022',
      title: 'Meeting with brand',
      time: '10:00am - 11:00am',
      other: '',
    },
    {
      id: 2,
      date: 'Nov 01, 2022',
      title: 'Meeting with brand',
      time: '10:00am - 11:00am',
      other: '',
    },
    {
      id: 3,
      date: 'Nov 01, 2022',
      title: 'Meeting with brand',
      time: '10:00am',
      other: 'other',
    },
  ]);
  console.log(event)
  return (
    <>
      {isToast && <Toast onClose={() => setIsToast(false)} />}
      <main className="container__dashboard">
        <div className="dashboard">
          <main className="calendar-section">
            <div className="calendar-page">
              <Calendar />
            </div>
          </main>

          <UpcomingPanel event={event} setEvent={setEvent}/>

          <NoteSection isVisible={() => setIsToast(true)} updateEvent={(array)=> setEvent((prev)=> [...prev,array])} />
        </div>
      </main>
    </>
  );
};

export default Event;
