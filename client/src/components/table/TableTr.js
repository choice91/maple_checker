import React from 'react';

import TableTd from './TableTd';

const TableTr = ({ index, dataType, name, ids, data, pathname }) => {
  return (
    <>
      <tr>
        <td key={index}>{name}</td>
        {ids.map((id, index) => (
          <>
            <TableTd
              index={index}
              dataType={dataType}
              dataId={id}
              data={data[id]}
              pathname={pathname}
            />
          </>
        ))}
      </tr>
    </>
  );
};

export default TableTr;
