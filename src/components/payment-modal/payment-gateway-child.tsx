import React from "react";

function PaymentGatewayChild({ data, setCodeGateway }) {
  return (
    <li className="border-b border-t border-gray-200 py-5 px-5">
      <div className="flex items-center flex-row justify-between ">
        <div className="flex flex-row">
          <img
            src={`${process.env.API_V2}/storage/images/gateway/${data.gateway_logo}`}
            alt="logo gateway"
            style={{ width: 40, height: 15 }}
          />
          <span className="ml-3">{data.gateway_name}</span>
        </div>
        <div>
          <input
            type="radio"
            name="gateway_code"
            value={data.gateway_code}
            onChange={(e) => setCodeGateway(e.target.value)}
          />
        </div>
      </div>
    </li>
  );
}

export default PaymentGatewayChild;
