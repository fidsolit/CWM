"use Client";

import React, { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { useRouter } from "next/navigation";
import { update_order_status } from "../Services/Admin/order";

interface Order {
  createdAt: string;
  deliveredAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  itemsPrice: number;
  orderItems: {
    qty: number;
    product: {
      productName: string;
      productPrice: number;
      _id: string;
    };
    _id: string;
  }[];
  totalAmount: number;
  _id: string;
}

export default function PendingOrdersDataTable() {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [orderData, setOrderData] = useState<Order[]>([]);
  const data = useSelector((state: RootState) => state.Admin.Order) as Order[];
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Order[]>([]);

  // Initialize pending orders
  useEffect(() => {
    const filterPendingOrder = data?.filter((item) => !item.isDelivered);
    setOrderData(filterPendingOrder);
  }, [data]);

  // Update filtered data whenever orderData changes
  useEffect(() => {
    setFilteredData(orderData);
  }, [orderData]);

  // Handle order status update
  const updateOrderStatus = async (id: string) => {
    const res = await update_order_status(id);
    if (res?.success) {
      toast.success(res?.message);

      // Update state immutably
      setOrderData((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, isDelivered: true } : order
        )
      );

      mutate("gettingAllOrdersForAdmin");
    } else {
      toast.error(res?.message);
    }
  };

  // Search functionality
  useEffect(() => {
    if (!search) {
      setFilteredData(orderData);
    } else {
      setFilteredData(
        orderData?.filter((item) =>
          item._id.toUpperCase().includes(search.toUpperCase())
        )
      );
    }
  }, [search, orderData]);

  const columns = [
    {
      name: "Order ID",
      selector: (row: Order) => row._id,
      sortable: true,
    },
    {
      name: "Total Price",
      selector: (row: Order) => row.totalAmount,
      sortable: true,
    },
    {
      name: "Delivered",
      selector: (row: Order) => (row.isDelivered ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: Order) => (
        <button
          onClick={() => updateOrderStatus(row._id)}
          className="w-20 py-2 mx-2 text-xs text-green-600 hover:text-white hover:bg-green-600 border border-green-600 rounded transition-all duration-700"
        >
          Mark Delivered
        </button>
      ),
    },
  ];

  return (
    <div className="w-full h-full">
      <DataTable
        columns={columns}
        data={filteredData || []}
        key={"ThisOrdersData"}
        pagination
        keyField="_id"
        title={`Orders List`}
        fixedHeader
        fixedHeaderScrollHeight="700px"
        selectableRows
        selectableRowsHighlight
        persistTableHead
        subHeader
        subHeaderComponent={
          <input
            className="w-60 dark:bg-transparent py-2 px-2 outline-none border-b-2 border-blue-600"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Order ID"
          />
        }
        className="bg-white px-4 h-5/6"
      />
    </div>
  );
}
