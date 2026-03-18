import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useAppDispatch } from '../redux/store';
import { inputValues } from '../redux/feature/comEventApiSlice';

const Header = () => {
  const [inputVal, setInputVal] = useState('');
  const [debouncedValue] = useDebounce(inputVal, 1000);

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (pathname !== '/') {
      setTimeout(() => {
        setInputVal('');
        dispatch(inputValues(''));
      }, 0);
    }
  }, [pathname]);

  useEffect(() => {
    if (debouncedValue === '' || debouncedValue) {
      dispatch(inputValues(debouncedValue));
    }
  }, [debouncedValue]);

  return (
    <>
      {pathname === '/cart-detail' ? (
        <header className="main-header " onClick={() => navigate('/')}>
          <h1 className="title">Trip Details</h1>
          <p className="description">View and edit AI-generated travel plans</p>
        </header>
      ) : (
        <header className="header">
          <h2>
            Welcom to{' '}
            <span>
              <span>Learn</span>ify
            </span>
          </h2>
          {!['/', '/events'].includes(pathname) && (
            <div className="left-item">
              <div className="seach">
                <input
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value.trim())}
                  type="text"
                  placeholder="Search..."
                />
                <img src="./image//search-svgrepo.png" alt="" />
              </div>
            </div>
          )}
        </header>
      )}
    </>
  );
};

export default Header;
