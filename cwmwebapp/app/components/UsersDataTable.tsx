"use Client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function UsersDataTable() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<UserData[]>([]);

  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       const response = await fetch("/api/Admin/UsersCount/get-all-users");
  //       const data = await response.json();
  //       if (data.success) {
  //         setUserData(data.data);
  //       }
  //     };
  //     fetchUsers();
  //   }, []);

  //   useEffect(() => {
  //     setFilteredData(userData);
  //   }, [userData]);

  const columns = [
    {
      name: "Name",
      selector: (row: UserData) => row?.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: UserData) => row?.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row: UserData) => row?.role,
      sortable: true,
    },
  ];

  useEffect(() => {
    if (search === "") {
      setFilteredData(userData);
    } else {
      setFilteredData(
        userData?.filter((item) => {
          const itemData = item?.name.toUpperCase();
          const textData = search.toUpperCase();
          return itemData.indexOf(textData) > -1;
        })
      );
    }
  }, [search, userData]);

  return (
    <div className="w-full h-full">
      <DataTable
        columns={columns}
        data={filteredData || []}
        key={"UsersData"}
        pagination
        keyField="id"
        title={`Users List`}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        selectableRows
        selectableRowsHighlight
        persistTableHead
        subHeader
        subHeaderComponent={
          <input
            className="w-60 dark:bg-transparent py-2 px-2 outline-none border-b-2 border-orange-600"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
          />
        }
        className="bg-white px-4 h-4/6"
      />
    </div>
  );
}
