import { useEffect } from 'react';

const ScrollToTop = ({ children, location }) => {
  console.log(location);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

export default ScrollToTop;
