import { useEffect, useState } from 'react';

type pr = {
  onClose: ()=> void;
};

const Toast = ({ onClose }: pr) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 1. Сразу после монтирования включаем анимацию "вниз"
    const showTimer = setTimeout(() => setVisible(true), 10);

    // 2. Через 3 секунды запускаем анимацию "вверх"
    const hideTimer = setTimeout(() => setVisible(false), 3000);

    // 3. Полностью удаляем компонент из родителя после завершения анимации (через 3.5с)
    const removeTimer = setTimeout(() => {
      if (onClose) onClose();
    }, 3500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);
  return (
    <div id="toast" className={`toast ${visible ? 'toast--active' : ''}`}>
      <div className="toast__content">
        <div className="toast__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div className="toast__message">
          <span className="toast__title">Успешно!</span>
          <span className="toast__text">Изменения сохранены.</span>
        </div>
      </div>
    </div>
  );
};

export default Toast

