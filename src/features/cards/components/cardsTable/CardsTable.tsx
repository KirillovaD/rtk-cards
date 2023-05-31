import React, { FC, useState } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableBody from "@mui/material/TableBody";
import { useSearchParams } from "react-router-dom";
import { FetchCardsResponseType } from "features/cards/service/cards.slice.types";
import Rating from "@mui/material/Rating";
import s from "./index.module.css";
import { useAppSelector } from "common/hooks";
import { selectProfile } from "features/auth/auth.selectors";
import { DeleteCardModal } from "features/cards/components/cardsTable/deleteCardModal/DeleteCardModal";

type Props = {
  cards: FetchCardsResponseType;
};

export const CardsTable: FC<Props> = ({ cards }) => {
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [searchParams, setSearchParams] = useSearchParams();
  const profile = useAppSelector(selectProfile);

  const headerCells = [
    { id: "question", label: "Question", sortable: true, sortType: "string" },
    { id: "answer", label: "Answer", sortable: true, sortType: "string" },
    { id: "updated", label: "Last Updated", sortable: true, sortType: "string" },
    { id: "grade", label: "Grade", sortable: true, sortType: "string" },
    ...(profile?._id === cards.packUserId ? [{ id: "actions", label: "Edit", sortable: false }] : []),
  ];

  const sortHandler = (id: string) => {
    const newOrder = sort === "asc" ? "desc" : "asc";
    setSort(newOrder);
    if (newOrder === "asc") {
      setSearchParams({ sortPacks: 0 + id });
    }
    if (newOrder === "desc") {
      setSearchParams({ sortPacks: 1 + id });
    }
  };

  const deleteCardHandler = (id: string) => {};

  return (
    <div className={s.cardsTable}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "50vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {headerCells.map((headerCell) => {
                  return (
                    <TableCell key={headerCell.id} align={"center"} className={s.headerCell}>
                      {headerCell.sortable ? (
                        <TableSortLabel
                          active={Object.fromEntries(searchParams).sortPacks?.slice(1) === headerCell.id}
                          direction={sort}
                          onClick={(event) => sortHandler(headerCell.id)}
                        >
                          {headerCell.label}
                        </TableSortLabel>
                      ) : (
                        headerCell.label
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.cards.map((card) => {
                const dateString = card.updated;
                const date = new Date(dateString);
                const day = date.getDate().toString().padStart(2, "0");
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear();
                const formattedDate = `${day}.${month}.${year}`;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={card._id}>
                    <TableCell component="th" scope="row" sx={{ cursor: "pointer" }}>
                      {card.question}
                    </TableCell>
                    <TableCell align="center">{card.answer}</TableCell>
                    <TableCell align="center">{formattedDate}</TableCell>
                    <TableCell align="center">
                      <Rating
                        name="simple-controlled"
                        value={card.grade}
                        // onChange={(event, newValue) => {
                        //   setValue(newValue);
                        // }}
                      />
                    </TableCell>
                    {card.user_id === profile?._id && (
                      <TableCell align="center">
                        <DeleteCardModal card={card} />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
