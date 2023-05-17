import React from "react";
import { PacksHeader } from "features/packs/packsHeader/PacksHeader";
import { PacksFilterTab } from "features/packs/paksFilterTab/PacksFilterTab";
import { PacksTable } from "features/packs/packsTable/PacksTable";

export const Packs = () => {
  return (
    <>
      <PacksHeader />
      <PacksFilterTab />
      <PacksTable />
    </>
  );
};
