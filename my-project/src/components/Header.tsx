import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <>
      {pathname === '/cart-detail' ? (
        <header className="main-header " onClick={() => navigate('/')}>
          <h1 className="title">Trip Details</h1>
          <p className="description">View and edit AI-generated travel plans</p>
        </header>
      ) : (
        <header className="header" >
          <h2>
            Welcom to{' '}
            <span>
              <span>Learn</span>ify
            </span>
          </h2>
          {pathname != '/events' && (
            <div className="left-item">
              <div className="seach">
                <input type="text" placeholder="Search..." />
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
