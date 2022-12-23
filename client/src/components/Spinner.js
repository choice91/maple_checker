import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';

import '../css/components/spinner.scss';

const Spinner = () => {
  return (
    <>
      <div className="spinner">
        <MoonLoader color="#e74c3c" />
      </div>
    </>
  );
};

export default Spinner;
