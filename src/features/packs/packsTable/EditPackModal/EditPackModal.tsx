import { PackType } from "features/packs/packs.api";
import React, { FC, KeyboardEvent, useEffect, useState } from "react";
import { packsThunks } from "features/packs/packs.slice";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useActions } from "common/hooks/useActions";
import s from "./index.module.css";

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

type IProps = {
  data: PackType;
};

export const EditPackModal: FC<IProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const { updatePack } = useActions(packsThunks);

  const addNewName = () => {
    updatePack({ ...data, name });
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const addPackOnKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      addNewName();
    }
  };

  useEffect(() => {
    setName(data.name);
  }, [data]);

  return (
    <>
      <EditIcon color="action" onClick={() => setOpen(true)} />
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
    </>
  );
};
