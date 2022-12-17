import React from 'react';

import TableTd from './TableTd';

const TableContent = ({ ids, quests }) => {
  return (
    <>
      <tr>
        <td>여로</td>
        <TableTd ids={ids} quests={quests} type="yeoro" />
      </tr>
      <tr>
        <td>츄츄</td>
        <TableTd ids={ids} quests={quests} type="chuchu" />
      </tr>
      <tr>
        <td>레헬른</td>
        <TableTd ids={ids} quests={quests} type="lachelein" />
      </tr>
      <tr>
        <td>아르카나</td>
        <TableTd ids={ids} quests={quests} type="arcana" />
      </tr>
      <tr>
        <td>모라스</td>
        <TableTd ids={ids} quests={quests} type="morass" />
      </tr>
      <tr>
        <td>에스페라</td>
        <TableTd ids={ids} quests={quests} type="esfera" />
      </tr>
      <tr>
        <td>세르니움(전)</td>
        <TableTd ids={ids} quests={quests} type="cernium" />
      </tr>
      <tr>
        <td>세르니움(후)</td>
        <TableTd ids={ids} quests={quests} type="burningCernium" />
      </tr>
      <tr>
        <td>호텔 아르크스</td>
        <TableTd ids={ids} quests={quests} type="arcs" />
      </tr>
      <tr>
        <td>오디움</td>
        <TableTd ids={ids} quests={quests} type="odium" />
      </tr>
    </>
  );
};

export default TableContent;
