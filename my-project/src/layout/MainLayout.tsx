import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { Fetch, FetchEvents } from '../redux/feature/comEventApiSlice';
import { useAppDispatch } from '../redux/store';

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scroll = pathname === '/see-all' || pathname === '/events';

  useEffect(() => {
    const ComSonStart = `${dayjs().format('YYYY-MM-DD')}T00:00:00Z`;
    const ComSonEnd = `${dayjs().add(10, 'day').format('YYYY-MM-DD')}T00:00:00Z`;

    dispatch(FetchEvents({ start: ComSonStart, end: ComSonEnd, page: 0 }));
    dispatch(Fetch({ classificationName: 'Music' }));
  }, []);

  useEffect(() => {
    const scrollableElement = document.querySelector('.container');
    if (scrollableElement) {
      scrollableElement.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }
  }, [pathname]);

  return (
    <>
      <div className="posish">
        <SideBar />
        <div className="wrapper-content">
          <Header />

          <main className="container" style={scroll ? { padding: '0' } : {}}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
