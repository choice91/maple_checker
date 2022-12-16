import React from 'react';

import TableTd from './TableTd';

const TableContent = ({ nicknames, quests }) => {
  return (
    <>
      <tr>
        <td>여로</td>
        <TableTd nicknames={nicknames} quests={quests} type="yeoro" />
      </tr>
      <tr>
        <td>츄츄</td>
        <TableTd nicknames={nicknames} quests={quests} type="chuchu" />
      </tr>
      <tr>
        <td>레헬른</td>
        <TableTd nicknames={nicknames} quests={quests} type="lachelein" />
      </tr>
      <tr>
        <td>아르카나</td>
        <TableTd nicknames={nicknames} quests={quests} type="arcana" />
      </tr>
      <tr>
        <td>모라스</td>
        <TableTd nicknames={nicknames} quests={quests} type="morass" />
      </tr>
      <tr>
        <td>에스페라</td>
        <TableTd nicknames={nicknames} quests={quests} type="esfera" />
      </tr>
      <tr>
        <td>세르니움(전)</td>
        <TableTd nicknames={nicknames} quests={quests} type="cernium" />
      </tr>
      <tr>
        <td>세르니움(후)</td>
        <TableTd nicknames={nicknames} quests={quests} type="burningCernium" />
      </tr>
      <tr>
        <td>호텔 아르크스</td>
        <TableTd nicknames={nicknames} quests={quests} type="arcs" />
      </tr>
      <tr>
        <td>오디움</td>
        <TableTd nicknames={nicknames} quests={quests} type="odium" />
      </tr>
    </>
  );
};

export default TableContent;
