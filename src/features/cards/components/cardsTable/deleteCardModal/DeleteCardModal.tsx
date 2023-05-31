import React, { FC, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CardType } from "features/cards/service/cards.slice.types";
import s from "./index.module.css";

const style = {};

type IProps = {
  card: CardType;
};

export const DeleteCardModal: FC<IProps> = ({ card }) => {
  const [open, setOpen] = useState(false);

  const deleteCardHandler = () => {};
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <DeleteIcon color="action" onClick={() => setOpen(true)} />
      {/*<EditIcon color="action" onClick={() => setOpen(true)} />*/}
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={s.modal}>
          <h3>Delete Card</h3>
          <p>
            Do you really want to remove <em>{card.question}</em>
          </p>
          <div className={s.modalBtns}>
            <Button type={"submit"} variant={"contained"} color={"primary"} onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type={"submit"} variant={"contained"} color={"error"} onClick={deleteCardHandler}>
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
