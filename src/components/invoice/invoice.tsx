//@ts-nocheck 
import moment from "moment";
import React from "react";
import NumberFormat from "react-number-format";
import DetailProductColumn from "../atom/details-product-column/detail-product-column";
export class Invoice extends React.PureComponent {
  constructor(props) {
    super(props);

    console.log(props);
  }
  render() {
    return (
      <span className="flex flex-col py-5 px-5">
        <div className="flex flex-row items-center justify-between">
          <img
            src={`/assets/logo-nav-min.png`}
            alt="logo karyanusantara"
            width={200}
            height={200}
          />
          <div className="flex flex-col items-end">
            <span className="text-gray-900 font-semibold">INVOICE</span>
            <span className="text-blue-100">{this.props.data.invoice}</span>
          </div>
        </div>
        <div className=" grid grid-cols-2 items-start mt-5">
          <div>
            <span
              style={{ fontSize: ".9rem" }}
              className="text-gray-800 font-semibold"
            >
              DITERBITKAN ATAS NAMA
            </span>
            <div className="flex flex-row mt-1">
              <span className="text-sm">Penjual </span>
              <span className="text-sm ml-2">:</span>
              <span className="ml-2 text-sm text-gray-800 font-semibold">
                {this.props.data.umkm.ukmName}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span
              style={{ fontSize: ".9rem" }}
              className="text-gray-800 font-semibold"
            >
              UNTUK
            </span>
            {/* <div className="grid grid-cols-11   mt-1 justify-start	">
              <span className="text-sm col-span-4"> pembeli </span>
              <span className="text-sm  col-span-1">:</span>
              <span className=" text-sm text-gray-800 font-semibold col-span-6 text-left">
               Tegar Akmal
              </span>
            </div>
            <div className="grid grid-cols-5   mt-1 justify-start	">
              <span className="text-sm col-span-2">Tanggal Pembelian </span>
              <span className="text-sm  col-span-1">:</span>
              <span className=" text-sm text-gray-800 font-semibold col-span-2 text-left">
               22 maret 2022
              </span>
            </div>
            <div className="grid grid-cols-11   mt-1 justify-start	">
              <span className="text-sm col-span-4">Alamat pembeli </span>
              <span className="text-sm  col-span-1">:</span>
              <span className=" text-sm text-gray-800 font-semibold col-span-6 text-left">
                Jl Tb simatupang no 18 Rt 002/Rw 001+62 812-8171-2428
              </span>
            </div> */}
            <dl>
              <dt className="text-sm  mb-1"> Pembeli</dt>
              <dd className=" text-sm  mb-1 text-gray-800 font-semibold">
                {" "}
                {this.props.data.buyers.name}
              </dd>
              <dt className="text-sm  mb-1">Tanggal Pembelian</dt>
              <dd className=" text-sm  mb-1 text-gray-800 font-semibold">
                {moment(this.props.data.created_at).format("DD MMMM YYYY")}
              </dd>
              <dt className="text-sm   mb-1">Alamat Pembelian </dt>
              <dd className=" text-sm  mb-1 text-gray-800 font-semibold break-words text-left whitespace-pre-wrap">
                {this.props.data.buyers_complate_address}
              </dd>
            </dl>
          </div>
        </div>

        <div className="mt-5">
          <table className="table w-full ">
            <tr className=" border-b border-t border-gray-600">
              <th className="text-sm w-1/3 py-2 text-gray-900 text-left">
                Info Produk
              </th>
              <th className="text-sm w-1/6 py-2 text-gray-900 text-right">
                Jumlah produk
              </th>
              <th className="text-sm w-1/6  py-2 text-gray-900 text-right">
                Harga Satuan
              </th>
              <th className="text-sm w-1/6 py-2 text-gray-900 text-right">
                Total Harga
              </th>
            </tr>
            {this.props.data.transaction_item.map((data) => {
              return (
                <tr className="border-b border-gray-200 py-4">
                  <td className="text-sm w-1/3 py-4 text-gray-900 flex flex-col">
                    <span className="text-blue-100 font-semibold text-left whitespace-nowrap break-words">
                      {data.product.name}
                    </span>
                    <span className="text-gray-600 text-xs mt-1">
                      Berat{" "}
                      <span className="text-gray-400 text-xs">
                        {data.product.weight} gr
                      </span>
                    </span>
                  </td>
                  <td className="text-sm w-1/6 py-4 text-gray-900 text-right">
                    {data.quantity}
                  </td>
                  <td className="text-sm w-1/6  py-4 text-gray-900 text-right">
                    <NumberFormat
                      value={data.product.price}
                      prefix="Rp"
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </td>
                  <td className="text-sm w-1/6 py-4 text-gray-900 text-right ">
                    <NumberFormat
                      value={data.amount}
                      prefix="Rp"
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
          <div className="flex items-end w-full justify-end flex-col mt-5">
            <div className="flex flex-row  gap-10 mb-2">
              <span className="text-right text-sm font-semibold">
                Total Harga {this.props.data.transaction_item.length}
              </span>
              <span className="text-right  text-sm font-semibold">
                <NumberFormat
                  value={this.props.data.amount}
                  prefix="Rp"
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </span>
            </div>

            <div className="flex flex-row   gap-10 mb-2">
              <span className="text-right text-sm text-gray-500">
                Ongkos kirim (400gr)
              </span>
              <span className="text-right text-sm text-gray-500">
                {" "}
                <NumberFormat
                  value={this.props.data.shipping_amount}
                  prefix="Rp"
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </span>
            </div>
            <div className="flex flex-row gap-10 mb-2">
              <span className="text-right text-sm font-semibold">
                Total Belanja (2barang)
              </span>
              <span className="text-right  text-sm font-semibold">
                {" "}
                <NumberFormat
                  value={
                    this.props.data.amount + this.props.data.shipping_amount
                  }
                  prefix="Rp"
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </span>
            </div>
          </div>
        </div>
      </span>
    );
  }
}

export default Invoice;
