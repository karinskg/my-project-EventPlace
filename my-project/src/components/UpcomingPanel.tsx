import { useCallback, useMemo, useState } from 'react';
import UpcomingCard from './UpcomingCard';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import dayjs from 'dayjs';
import { removeEvent, renameEvent } from '../redux/feature/calendarSlice';

const UpcomingPanel = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const dispatch = useDispatch();
 
  const event = useSelector((state: RootState) => state.calendar.event);

  // 1. Готовим строки для сравнения ОДИН раз
  // const { todayStr, tomorrowStr } = useMemo(() => {
  //   const now = dayjs();
  //   return {
  //     todayStr: now.format('YYYY-MM-DD'),
  //     tomorrowStr: now.add(1, 'day').format('YYYY-MM-DD')
  //   };
  // }, []); 

  

  const isToday = useMemo(()=>{
    return event.filter((el)=> dayjs(el.date).isSame(dayjs(),'day'))
  },[event])

  const isTomorow = useMemo(()=>{
    return event.filter((el)=> dayjs(el.date).isSame(dayjs().add(1, 'day'), 'day'))
  },[event])

  // const { todayEvents, tomorrowEvents } = useMemo(() => {
  //   const todayList: typeof event = [];
  //   const tomorrowList: typeof event = [];

  //   event.forEach((el) => {
  //     if (el.date.startsWith(todayStr)) {
  //       todayList.push(el);
  //     } else if (el.date.startsWith(tomorrowStr)) {
  //       tomorrowList.push(el);
  //     }
  //   });

  //   return { todayEvents: todayList, tomorrowEvents: tomorrowList };
  // }, [event, todayStr, tomorrowStr]);


  const handleToggle = useCallback((id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  const handleRemove = useCallback(
    (id: number) => {
      dispatch(removeEvent({ id }));
    },
    [dispatch],
  );

  const handleRename = useCallback(
    (id: number, newTitle: string) => {
      dispatch(
        renameEvent({
          id: id,
          newTitle: newTitle,
        }),
      );
    },
    [dispatch],
  );

  return (
    <aside className="upcoming-panel">
      <h2 className="upcoming-panel__title">Upcoming</h2>

      <div className="upcoming-section">
        <h3 className="upcoming-section__date">Today</h3>

        {isToday.length !== 0 ? (
          isToday.map((el) => (
            <UpcomingCard
              key={el.id}
              list={el}
              isActive={activeId === el.id}
              onToggle={handleToggle}
              onRemove={handleRemove}
              onRename={handleRename}
            />
          ))
        ) : (
          <p>пока нет событий</p>
        )}
      </div>

      <div className="upcoming-section">
        <h3 className="upcoming-section__date">Tomorrow</h3>
        {isTomorow.length !== 0 ? (
          isTomorow.map((el) => (
            <UpcomingCard
              key={el.id}
              list={el}
              isActive={activeId === el.id}
              onToggle={handleToggle}
              onRename={handleRename}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <p>пока нет событий</p>
        )}
      </div>
    </aside>
  );
};

export default UpcomingPanel;
