import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const content = document.getElementById('page-scrollable-content');
    if (!content) {
      console.error('Unable to scroll page to the top, content is missing');
      return;
    }
    content.scrollTo(0, 0);
  }, [pathname]);

  return null;
}