import React from 'react'

function QuantityCard({ quantityValue, setQuantityValue }) {
  console.log(quantityValue)
  const addQuantity = () => {
    setQuantityValue(quantityValue + 1);
    console.log(quantityValue);
  };

  const lessQuantity = () => {
    setQuantityValue(quantityValue - 1);
  };
  return (
    <div className="border w-full border-gray-300 mt-2 items-center py-1 px-1 rounded-md justify-between  flex flex-row">
      {quantityValue > 0 ? (
        <button
          className="  border-l border-gray-300  w-1/3"
          onClick={() => lessQuantity()}
        >
          -
        </button>
      ) : (
        <button className="  border-l border-gray-300  w-1/3">-</button>
      )}

      <input
        placeholder="1"
        className="pr-5 px-5 text-center border"
        value={quantityValue}
        defaultValue="0"
        onChange={(value) => {
          if (value.target.value == "" || value.target.value == null) {
            setQuantityValue(null);
          } else {
            setQuantityValue(parseInt(value.target.value));
          }
        }}
        type="number"
      />
      <button
        className="border-r border-gray-300 w-1/3"
        onClick={() => addQuantity()}
      >
        +
      </button>
    </div>
  );
}

export default QuantityCard