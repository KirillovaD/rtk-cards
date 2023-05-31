import React, { ChangeEvent, FC, useState } from "react";
import { useAppSelector } from "common/hooks";
import { selectPacks } from "features/packs/packs.selectors";
import s from "./styles.module.css";
import Pagination from "@mui/material/Pagination";

type Props = {
  onChange: (newPage: number, newCount: number) => void;
  page: number;
  itemsCountForPage: number;
};
export const PaginationCustom: FC<Props> = ({ onChange, page, itemsCountForPage }) => {
  const packs = useAppSelector(selectPacks);
  const pages = Math.ceil(packs.cardPacksTotalCount / packs.pageCount);
  const options = [
    { id: 7, value: 7 },
    { id: 10, value: 10 },
  ];
  const mappedOptions: any[] = options
    ? options.map((o) => (
        <option id={o.id.toString()} className={s.option} key={o.id} value={o.id}>
          {o.value}
        </option>
      ))
    : [];

  const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
    onChange(page, itemsCountForPage);
  };
  const setCountPerPageHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(page, +e.currentTarget.value);
  };

  return (
    <div className={s.pagination}>
      <Pagination count={pages} shape="rounded" onChange={changePageHandler} hideNextButton hidePrevButton />
      <span className={s.text1}>показать</span>
      <select className={s.select} onChange={setCountPerPageHandler}>
        {mappedOptions}
      </select>
      <span className={s.text2}>строк в таблице</span>
    </div>
  );
};
