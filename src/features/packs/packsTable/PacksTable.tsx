import React, { FC, useState, MouseEvent } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import s from "./style.module.css";
import TableBody from "@mui/material/TableBody";
import { selectPacks } from "features/packs/packs.selectors";
import SchoolIcon from "@mui/icons-material/School";
import { selectProfile } from "features/auth/auth.selectors";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";
import { EditPackModal } from "features/packs/packsTable/EditPackModal/EditPackModal";
import { useActions } from "common/hooks/useActions";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PATH } from "common/service/routing/paths";

const headerCells = [
  { id: "name", label: "Name", sortable: true, sortType: "string" },
  { id: "cards", label: "Cards", sortable: true, sortType: "string" },
  { id: "updated", label: "Last Updated", sortable: true, sortType: "string" },
  { id: "created", label: "Created by", sortable: true, sortType: "string" },
  { id: "actions", label: "Actions", sortable: false, sortType: "string" },
] as const;

export const PacksTable: FC = () => {
  const packs = useAppSelector(selectPacks);
  const profile = useAppSelector(selectProfile);
  const { deletePack, getPacks } = useActions(packsThunks);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const deletePackHandler = (packId: string) => {
    deletePack(packId);
  };
  const sortHandler = (event: MouseEvent<HTMLSpanElement, Event>, id: string) => {
    const newOrder = sort === "asc" ? "desc" : "asc";
    setSort(newOrder);
    if (newOrder === "asc") {
      setSearchParams({ sortPacks: 0 + id });
    }
    if (newOrder === "desc") {
      setSearchParams({ sortPacks: 1 + id });
    }
  };
  const navigateToCardsPageHandler = (packId: string) => {
    navigate(`/cards/${packId}`);
    //navigate(PATH.PACKS + PATH.CARDS
  };
  return (
    <div className={s.packsTable}>
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
                          onClick={(event) => sortHandler(event, headerCell.id)}
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
              {packs.cardPacks.map((pack) => {
                const dateString = pack.updated;
                const date = new Date(dateString);
                const day = date.getDate().toString().padStart(2, "0");
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear();
                const formattedDate = `${day}.${month}.${year}`;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={pack._id}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigateToCardsPageHandler(pack._id)}
                    >
                      {pack.name}
                    </TableCell>
                    <TableCell align="center">{pack.cardsCount}</TableCell>
                    <TableCell align="center">{formattedDate}</TableCell>
                    <TableCell align="center">{pack.user_name}</TableCell>
                    <TableCell align="center">
                      <div className={s.actionIcons}>
                        <SchoolIcon
                          onClick={() => navigateToCardsPageHandler(pack._id)}
                          sx={{ cursor: "pointer" }}
                          color="action"
                        />
                        {profile?._id === pack.user_id && (
                          <div className={s.editIcons}>
                            <DeleteIcon color="action" onClick={() => deletePackHandler(pack._id)} />
                            <EditPackModal data={pack} />
                          </div>
                        )}
                      </div>
                    </TableCell>
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
