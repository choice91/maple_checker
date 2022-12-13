import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getQuests } from '../redux/async/quest';

import Header from '../components/Header';
import Quest from '../components/Quest';
import Boss from '../components/Boss';
import Event from '../components/Event';

import '../css/pages/main.scss';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getQuests({ navigate }));
  }, []);

  return (
    <>
      <Header />
      <main>
        <Quest />
        <Boss />
        <Event />
      </main>
    </>
  );
};

export default Main;
