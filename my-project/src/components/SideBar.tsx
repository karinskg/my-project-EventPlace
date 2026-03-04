import { Link, NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <aside className="side-bar">
      <nav className="navigation">
        <NavLink to="/">
          {({ isActive }) => (
            <li className={isActive ? 'active' : ''}>
              <img src="./image/home-svgrepo-com.png" alt="Домой" />
            </li>
          )}
        </NavLink>
        <NavLink to="/favourites">
          {({ isActive }) => (
            <li className={isActive ? 'active' : ''}>
              <img src="./image/heart-angle-svgrepo-com.png" alt="Избранное" />
            </li>
          )}
        </NavLink>
        <NavLink to="/events">
          {({ isActive }) => (
            <li className={isActive ? 'active' : ''}>
              <img src="./image/calendar-svgrepo-com.png" alt="События" />
            </li>
          )}
        </NavLink>
      </nav>
    </aside>
  );
};

export default SideBar;
