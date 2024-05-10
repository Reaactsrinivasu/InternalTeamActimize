import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const useBrowserBack = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleBrowserBack = () => {
      
      navigate('/home');
    };
    window.addEventListener('popstate', handleBrowserBack);
    return () => {
      window.removeEventListener('popstate', handleBrowserBack);
    };
  }, [navigate]);
};
export default useBrowserBack;
