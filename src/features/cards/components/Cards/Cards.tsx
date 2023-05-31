import { useParams, useSearchParams } from "react-router-dom";
import { useAddCardMutation, useGetCardsQuery } from "features/cards/service/cards.slice";
import React, { useState } from "react";
import { CardsHeader } from "features/cards/components/cardsHeader/CardsHeader";
import { EmptyCardUser } from "features/cards/components/emptyCard/EmptyCardUser";
import s from "./index.module.css";
import { useAppSelector } from "common/hooks";
import { selectProfile } from "features/auth/auth.selectors";
import Button from "@mui/material/Button";
import { AddCardModal } from "features/cards/components/addCardModal/AddCardModal";
import { CardsTable } from "features/cards/components/cardsTable/CardsTable";
import Pagination from "@mui/material/Pagination";
import { PaginationCustom } from "features/packs/pagination/Pagination";

export const Cards = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  let { packId } = useParams<{ packId: string }>();
  const [itemsCountForPage, setItemsCountForPage] = useState(7);

  const [searchParams, setSearchParams] = useSearchParams();

  const profile = useAppSelector(selectProfile);

  const { data, error } = useGetCardsQuery(packId ?? "");

  const onChangePagination = (newPage: number, newCount: number) => {
    setPage(newPage);
    setItemsCountForPage(newCount);
    setSearchParams({ page: newPage.toString(), pageCount: newCount.toString() });
  };

  return (
    <div className={s.cards}>
      <CardsHeader />
      {data && data.cards.length > 0 ? (
        <div>
          <div className={s.cardsHeader}>
            <h1>{data.packName ?? ""}</h1>
            {data.packUserId === profile?._id ? (
              <div className={s.cardsBtns}>
                <Button type={"submit"} variant={"contained"} color={"primary"}>
                  Learn
                </Button>
                <Button type={"submit"} variant={"contained"} color={"primary"} onClick={() => setOpen(true)}>
                  Add new card
                </Button>
                <AddCardModal open={open} setOpen={setOpen} packId={packId} />
              </div>
            ) : (
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Learn
              </Button>
            )}
          </div>
          <CardsTable cards={data} />
          <PaginationCustom page={page} onChange={onChangePagination} itemsCountForPage={itemsCountForPage} />

          {/*<div>{JSON.stringify(data)}</div>*/}
        </div>
      ) : (
        <div>
          <h1>{data && data.packName}</h1>
          {data && data.packUserId === profile?._id ? (
            <EmptyCardUser packId={packId} />
          ) : (
            <p className={s.cardsInfo}>This pack is empty.</p>
          )}
        </div>
      )}
    </div>
  );
};
