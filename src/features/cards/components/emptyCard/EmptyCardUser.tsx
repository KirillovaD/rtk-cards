import React, { FC, useState } from "react";
import Button from "@mui/material/Button";
import s from "./index.module.css";
import { AddCardModal } from "features/cards/components/addCardModal/AddCardModal";

type Props = {
  packId: string | undefined;
};

export const EmptyCardUser: FC<Props> = ({ packId }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={s.info}>
      <p>This pack is empty. Click add new card to fill this pack</p>
      <Button type={"submit"} variant={"contained"} color={"primary"} onClick={() => setOpen(true)}>
        Add new card
      </Button>
      <div>
        <AddCardModal open={open} setOpen={setOpen} packId={packId} />
      </div>
    </div>
  );
};
