import React from 'react'

function DetailProductColumn({ columnLeft ,columnRight}) {
  return (
    <li className="flex flex-row justify-between items-start mb-2">
      <span className="text-sm text-black  table-cell  w-1/5 lg:w-1/4">{columnLeft} : </span>
      <span
        className="text-sm  ml-5  table-cell text-left flex-1"
        style={{ color: "#737373" }}
      >
        {columnRight}
      </span>
    </li>
  );
}

export default DetailProductColumn