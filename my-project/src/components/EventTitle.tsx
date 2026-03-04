import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventTitle = () => {
  const navigate = useNavigate()
  return (
    <div className="event_title">
      <h1 className="title_coming">Coming soon Events</h1>
      <button className="filter-btn" onClick={()=> navigate('/see-all')}>See All</button>
    </div>
  );
};

export default EventTitle;
