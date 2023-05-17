import React, { FC } from "react";
import { Button } from "@mui/material";
import s from "./style.module.css";

export const PacksHeader: FC = () => {
  return (
    <div className={s.packsHeader}>
      <h1>Packs list</h1>
      <Button type={"submit"} variant={"contained"} color={"primary"}>
        Add new pack
      </Button>
    </div>
  );
};
