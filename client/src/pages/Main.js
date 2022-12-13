import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getQuests } from '../redux/async/quest';

import Header from '../components/Header';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getQuests({ navigate }));
  }, []);

  return (
    <>
      <Header />
    </>
  );
};

export default Main;
