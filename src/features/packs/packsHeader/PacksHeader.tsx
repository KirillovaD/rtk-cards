import React, { FC, KeyboardEvent, useState } from "react";
import Button from "@mui/material/Button";
import s from "./style.module.css";
import { packsThunks } from "features/packs/packs.slice";
import { useActions } from "common/hooks/useActions";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const PacksHeader: FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { createPack } = useActions(packsThunks);

  const addNewName = () => {
    createPack({ name });
    handleCloseModal();
    setName("");
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const addPackOnKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      addNewName();
    }
  };

  return (
    <div className={s.packsHeader}>
      <h1>Packs list</h1>
      <Button type={"submit"} variant={"contained"} color={"primary"} onClick={() => setOpen(true)}>
        Add new pack
      </Button>
      <div>
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h3>Pack name</h3>
            <div className={s.addName}>
              <TextField
                value={name}
                id="name"
                type="text"
                variant="standard"
                margin="normal"
                placeholder="Name"
                onChange={(e) => setName(e.currentTarget.value)}
                onKeyDown={addPackOnKeyPress}
                fullWidth={true}
              />
              <IconButton onClick={addNewName}>
                <AddIcon color="primary" fontSize="small" />
              </IconButton>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
