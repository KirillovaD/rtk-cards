import React, { ChangeEvent, useEffect, useState } from "react";
import { PacksHeader } from "features/packs/packsHeader/PacksHeader";
import { PacksFilterTab } from "features/packs/paksFilterTab/PacksFilterTab";
import { PacksTable } from "features/packs/packsTable/PacksTable";
import { packsThunks } from "features/packs/packs.slice";
import { useActions } from "common/hooks/useActions";
import s from "./styles.module.css";
import Pagination from "@mui/material/Pagination";
import { useAppSelector } from "common/hooks";
import { selectPacks } from "features/packs/packs.selectors";

export const Packs = () => {
  const { getPacks } = useActions(packsThunks);
  const packs = useAppSelector(selectPacks);
  const pages = packs.cardPacksTotalCount / packs.pageCount;
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPacks({ page });
  }, [page]);

  const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };
  return (
    <div className={s.packs}>
      <PacksHeader />
      <PacksFilterTab />
      <PacksTable />
      <Pagination count={pages} variant="outlined" shape="rounded" onChange={changePageHandler} />
    </div>
  );
};
