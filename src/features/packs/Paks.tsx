import React, { useEffect, useState } from "react";
import { PacksHeader } from "features/packs/packsHeader/PacksHeader";
import { PacksFilterTab } from "features/packs/paksFilterTab/PacksFilterTab";
import { PacksTable } from "features/packs/packsTable/PacksTable";
import { packsThunks } from "features/packs/packs.slice";
import { useActions } from "common/hooks/useActions";
import s from "./styles.module.css";
import { PaginationCustom } from "features/packs/pagination/Pagination";
import { useSearchParams } from "react-router-dom";

export const Packs = () => {
  const { getPacks } = useActions(packsThunks);
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const [itemsCountForPage, setItemsCountForPage] = useState(7);

  const onChangePagination = (newPage: number, newCount: number) => {
    setPage(newPage);
    setItemsCountForPage(newCount);
    setSearchParams({ page: newPage.toString(), pageCount: newCount.toString() });
  };

  useEffect(() => {
    debugger;
    const params = Object.fromEntries(searchParams);
    if (params) {
      getPacks(params);
    } else {
      getPacks({});
    }
  }, [searchParams]);

  return (
    <div className={s.packs}>
      <PacksHeader />
      <PacksFilterTab />
      <PacksTable />
      <PaginationCustom page={page} onChange={onChangePagination} itemsCountForPage={itemsCountForPage} />
    </div>
  );
};
