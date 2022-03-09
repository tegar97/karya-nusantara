import React from 'react'

function DetailProductColumn({ columnLeft ,columnRight}) {
  return (
      <li className=" table-row">
        <span className="text-sm text-black  table-cell">{columnLeft}</span>
        <span
          className="text-sm  ml-5  table-cell text-left"
          style={{ color: "#737373" }}
        >
          {columnRight}
        </span>
      </li>
  );
}

export default DetailProductColumn