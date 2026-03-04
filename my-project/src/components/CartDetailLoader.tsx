// import ContentLoader from 'react-content-loader';
// const CartDetailLoader = () => {
//   return (
//     <ContentLoader
//       speed={2}
//       width="160rem"
//       height="110rem"
//       viewBox="0 0 160rem 110rem"
//       backgroundColor="#dedede"
//       foregroundColor="#ecebeb"
//       >
//       <rect x="0" y="0rem" rx="5" ry="5" width="75rem" height="51.2rem" />
//       <rect x="78rem" y="0rem" rx="5" ry="5" width="40rem" height="25rem" />
//       <rect x="120rem" y="0rem" rx="5" ry="5" width="40rem" height="25rem" />
//       <rect x="78rem" y="26rem" rx="5" ry="5" width="40rem" height="25rem" />
//       <rect x="120rem" y="26rem" rx="5" ry="5" width="40rem" height="25rem" />
//     </ContentLoader>
//   );
// };

// export default CartDetailLoader;

import React, { useState, useEffect } from 'react';
import ContentLoader from 'react-content-loader';

const CartDetailLoader = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Параметры для мобилки (в колонну)
  const mobileProps = {
    width: '70rem',
    height: '180rem',
    viewBox: '0 0 80 180',
  };

  // Параметры для десктопа (ваш оригинал)
  const desktopProps = {
    width: '160rem',
    height: '110rem',
    viewBox: '0 0 160 110',
  };

  const props = isMobile ? mobileProps : desktopProps;

  return (
    <ContentLoader speed={2} backgroundColor="#dedede" foregroundColor="#ecebeb" {...props}>
      {/* Основной большой квадрат */}
      <rect x="0" y="0" rx="5" ry="5" width={isMobile ? '8.5rem' : '7.5rem'} height="5.1rem" />

      {isMobile ? (
        <>
          {/* Мобильная раскладка: все в один столбец ниже первого блока */}
          <rect x="0" y="5.5rem" rx="5" ry="5" width="8.5rem" height="2.5rem" />
          <rect x="0" y="8.5rem" rx="5" ry="5" width="8.5rem" height="2.5rem" />
          <rect x="0" y="11.5rem" rx="5" ry="5" width="8.5rem" height="2.5rem" />
          <rect x="0" y="14.5rem" rx="5" ry="5" width="8.5rem" height="2.5rem" />
        </>
      ) : (
        <>
          {/* Десктопная раскладка (сетка справа) */}
          <rect x="78" y="0" rx="5" ry="5" width="4rem" height="2.5rem" />
          <rect x="120" y="0" rx="5" ry="5" width="40" height="2.5rem" />
          <rect x="78" y="26" rx="5" ry="5" width="40" height="2.5rem" />
          <rect x="120" y="26" rx="5" ry="5" width="40" height="2.5rem" />
        </>
      )}
    </ContentLoader>
  );
};

export default CartDetailLoader;
