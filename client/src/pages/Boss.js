import React from 'react';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import Header from '../components/Header';
import Layout from '../components/Layout';

const Boss = () => {
  return (
    <>
      <Header page="boss" />
      <Layout>
        <div className="table-btn">
          <button>
            <PersonAddAltIcon />
            <span>캐릭터 추가</span>
          </button>
        </div>
        <table>
          <thead></thead>
          <tbody></tbody>
        </table>
      </Layout>
    </>
  );
};

export default Boss;
