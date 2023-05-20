import React, { FC } from "react";
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

export const PacksTable: FC = () => {
  const packs = useAppSelector(selectPacks);
  const profile = useAppSelector(selectProfile);
  const { deletePack } = useActions(packsThunks);
  const deletePackHandler = (packId: string) => {
    deletePack(packId);
  };

  return (
    <div className={s.packsTable}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "50vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    fontWeight: "bold",
                    backgroundColor: "#EFEFEF",
                  },
                }}
              >
                <TableCell>Name</TableCell>
                <TableCell align="center" sx={{ width: "10%" }}>
                  Cards
                </TableCell>
                <TableCell align="center">Last Updated</TableCell>
                <TableCell align="center">Created by</TableCell>
                <TableCell align="center" sx={{ width: "10%" }}>
                  Actions
                </TableCell>
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
                    <TableCell component="th" scope="row">
                      {pack.name}
                    </TableCell>
                    <TableCell align="center">{pack.cardsCount}</TableCell>
                    <TableCell align="center">{formattedDate}</TableCell>
                    <TableCell align="center">{pack.user_name}</TableCell>
                    <TableCell align="center" sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                      <SchoolIcon color="action" />
                      {profile?._id === pack.user_id && (
                        <div className={s.editIcons}>
                          <DeleteIcon color="action" onClick={() => deletePackHandler(pack._id)} />
                          <EditPackModal data={pack} />
                        </div>
                      )}
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
