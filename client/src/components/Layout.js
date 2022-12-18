import React from 'react';

import '../css/components/layout.scss';

const Layout = ({ children }) => {
  return (
    <>
      <div className="layout">{children}</div>
    </>
  );
};

export default Layout;
