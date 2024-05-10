import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import Approutes from './Approutes';
import LoginForm from './LoginForm';
import { generateToken, messaging, onMessageListener } from './firebase';
import { onMessage } from 'firebase/messaging';
import { loadNotificationsDetailsStart } from './redux/actions/loadNotificationsActions';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => { 
    onMessage(messaging,(payload)=> {
      dispatch(loadNotificationsDetailsStart());
     
    });
   }, []);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      navigate( <LoginForm />);
    }
    if (storedToken && pathname === '/login') {
      setToken(storedToken);
      navigate('/');
    }
  }, [token, navigate, pathname]);

  if (!token) {
    return <LoginForm />;
  }
 
  return (
    <div className="App">
      <ToastContainer />
      <Approutes />
    </div>
  );
}
export default App;