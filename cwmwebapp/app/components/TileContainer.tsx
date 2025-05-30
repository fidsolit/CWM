"use client";

import React, { useEffect, useState } from "react";
// import StatsTiles from '../../components/StatsTiles';
import StatsTiles from "./StatsTiles";
import GettingDatasLength from "@/app/tilesDatas/Tiles";

interface tile {
  icon: string;
  color: string;
  title: string;
  count: number; // Allow both number and array types
}

export default function TileContainer() {
  const [data, setData] = useState(GettingDatasLength());

  return (
    <>
      {data?.map((tile: tile, index: number) => {
        return (
          <StatsTiles
            key={index}
            Icon={tile.icon}
            color={tile.color}
            title={tile.title}
            count={tile.count}
          />
        );
      })}
    </>
  );
}
