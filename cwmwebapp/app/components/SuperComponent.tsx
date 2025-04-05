import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/Store/store";
import TileContainer from "./TileContainer";
import ProductDataTable from "./ProductDataTable";
import CategoryDataTable from "./CategoryDataTable";
import PendingOrdersDataTable from "./PendingOrdersDataTable";
import CompletedOrderDataTable from "./CompletedOrderDataTable";
import StockInDataTable from "./StockIn";
import POSSystem from "./POSSystem";
import UsersDataTable from "./UsersDataTable";
import WarrantyClaimsDataTable from "./WarrantyClaimsDataTable";
import { fetchWarrantyClaims } from "@/utils/warrantyClaimsActions";

export default function SuperComponent() {
  const dispatch = useDispatch();
  const navActive = useSelector((state: RootState) => state.AdminNav.ActiveNav);

  useEffect(() => {
    fetchWarrantyClaims(dispatch);
  }, [dispatch]);

  switch (navActive) {
    case "Base":
      return <TileContainer />;
    case "activeProducts":
      return <ProductDataTable />;
    case "activeCategories":
      return <CategoryDataTable />;
    case "activePendingOrder":
      return <PendingOrdersDataTable />;
    case "activeDeliveredOrder":
      return <CompletedOrderDataTable />;
    case "activeStockIn":
      return <StockInDataTable />;
    case "activePOS":
      return <POSSystem />;
    case "activeUsers":
      return <UsersDataTable />;
    case "activeWarrantyClaims":
      return <WarrantyClaimsDataTable />;
    default:
      return <TileContainer />;
  }
}

export const dynamic = "force-dynamic";
