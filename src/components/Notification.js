import React, { useState, useEffect } from 'react';
import { generateToken, onMessageListener } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { loadNotificationsDetailsStart } from '../redux/actions/loadNotificationsActions';
const Notification = () => {
  const [notification, setNotification] = useState({ title: '', body: '' });
  const dispatch = useDispatch();
  useEffect(() => {
    generateToken();
    dispatch(loadNotificationsDetailsStart());
  }, []);

  return (
    <div>
      <p><b>{notification?.title}</b></p>
      <p>{notification?.body}</p>
    </div>
  );
};

export default Notification;
