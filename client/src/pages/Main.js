import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getQuests } from '../redux/async/quest';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getQuests({ navigate }));
  }, []);

  return (
    <>
      <h2>메인화면</h2>
    </>
  );
};

export default Main;
