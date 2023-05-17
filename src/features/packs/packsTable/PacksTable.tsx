import React, { FC } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import s from "./style.module.css";
import TableBody from "@mui/material/TableBody";

type DataType = {
  name: string;
  cards: number;
  lastUpdated: string;
  createdBy: string;
};

export const PacksTable: FC = () => {
  function createData(name: string, cards: number, lastUpdated: string, createdBy: string): DataType {
    return { name, cards, lastUpdated, createdBy };
  }

  const rows = [
    createData("Pack Name", 4, Date.now().toString(), "Ivan Ivanov"),
    createData("Pack Name", 4, Date.now().toString(), "Ivan Ivanov"),
    createData("Pack Name", 4, Date.now().toString(), "Ivan Ivanov"),
    createData("Pack Name States", 4, Date.now().toString(), "Ivan Ivanov"),
    createData("Pack Name", 4, Date.now().toString(), "Ivan Ivanov"),
    createData("Pack Name", 4, Date.now().toString(), "Ivan Ivanov"),
    createData("Pack Name", 4, Date.now().toString(), "Ivan Ivanov"),
    createData("Pack Name", 4, Date.now().toString(), "Ivan Ivanov"),
    createData("Pack Name", 4, Date.now().toString(), "Ivan Ivanov"),
    createData("Pack Name", 4, Date.now().toString(), "Ivan Ivanov"),
    createData("Pack Name", 4, Date.now().toString(), "Ivan Ivanov"),
    createData("Pack Name ", 4, Date.now().toString(), "Ivan Ivanov"),
  ];
  return (
    <div className={s.packsTable}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
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
                <TableCell align="right">Cards</TableCell>
                <TableCell align="right">Last Updated</TableCell>
                <TableCell align="right">Created by</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.cards}</TableCell>
                    <TableCell align="right">{row.createdBy}</TableCell>
                    <TableCell align="right">{row.lastUpdated}</TableCell>
                    <TableCell align="right">actions</TableCell>
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
