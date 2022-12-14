import React from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const Td = ({ quests, type }) => {
  return (
    <>
      {quests.map((quest, index) => (
        <td key={index}>
          <button name={quest.nickname} value={type}>
            {quest.quests.yeoro ? (
              <CheckBoxIcon style={{ color: '#3498db' }} />
            ) : (
              <CheckBoxOutlineBlankIcon style={{ color: '#fff' }} />
            )}
          </button>
        </td>
      ))}
    </>
  );
};

const TableContent = ({ quests }) => {
  return (
    <>
      <tr>
        <td>여로</td>
        <Td quests={quests} type="yeoro" />
      </tr>
      <tr>
        <td>츄츄</td>
        <Td quests={quests} type="chuchu" />
      </tr>
      <tr>
        <td>레헬른</td>
        <Td quests={quests} type="lachelein" />
      </tr>
      <tr>
        <td>아르카나</td>
        <Td quests={quests} type="arcana" />
      </tr>
      <tr>
        <td>모라스</td>
        <Td quests={quests} type="morass" />
      </tr>
      <tr>
        <td>에스페라</td>
        <Td quests={quests} type="esfera" />
      </tr>
      <tr>
        <td>세르니움(전)</td>
        <Td quests={quests} type="cernium" />
      </tr>
      <tr>
        <td>세르니움(후)</td>
        <Td quests={quests} type="burningCernium" />
      </tr>
      <tr>
        <td>호텔 아르크스</td>
        <Td quests={quests} type="arcs" />
      </tr>
      <tr>
        <td>오디움</td>
        <Td quests={quests} type="odium" />
      </tr>
    </>
  );
};

export default TableContent;
