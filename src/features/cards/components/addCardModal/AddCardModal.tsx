import React, { FC } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { FormControl, FormGroup, FormLabel, MenuItem, Select, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import s from "./index.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddCardMutation } from "features/cards/service/cards.slice";
import { ArgCreateCardType } from "features/cards/service/cards.slice.types";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

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

const schema = yup.object({
  question: yup.string().required("Field couldn't be empty"),
  answer: yup.string().required("Field couldn't be empty"),
});

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  packId: string | undefined;
};

export const AddCardModal: FC<Props> = ({ open, setOpen, packId }) => {
  const [addCard] = useAddCardMutation();

  const handleCloseModal = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    if (packId) {
      const newCard: ArgCreateCardType = {
        cardsPack_id: packId,
        question: data.question,
        answer: data.answer,
      };
      addCard(newCard)
        .unwrap()
        .then((res) => {
          const cardQuestion = res.newCard.question;
          toast.success(`Card ${cardQuestion} successfully added`);
        })
        .catch((err) => {
          toast.error(err.data.error);
        });
    }
    reset();
  });

  const closeModalHandler = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={s.modalHeader}>
          <h3>Add new card</h3>
          <CloseIcon color="action" fontSize="small" onClick={closeModalHandler} />
        </div>

        <form className={s.form} onSubmit={onSubmit}>
          <FormControl size="small" className={s.formFields}>
            <FormGroup className={s.formField}>
              <FormLabel component="legend">Choose a question format</FormLabel>
              <Select id="format" {...register("format")} placeholder={"Text"}>
                <MenuItem value="">
                  <em>select the value</em>
                </MenuItem>
                <MenuItem value={"text"}>Text</MenuItem>
                <MenuItem value={"number"}>Image</MenuItem>
                <MenuItem value={"number"}>Video</MenuItem>
              </Select>
            </FormGroup>
            <FormGroup>
              <TextField
                id="question"
                type="text"
                label="Question"
                variant="standard"
                margin="normal"
                fullWidth={true}
                {...register("question")}
                helperText={errors.question?.message?.toString()}
              />
              <TextField
                id="answer"
                type="text"
                variant="standard"
                label="Answer"
                margin="normal"
                fullWidth={true}
                {...register("answer")}
                helperText={errors.answer?.message?.toString()}
              />
            </FormGroup>
            <IconButton type={"submit"}>
              <AddIcon color="primary" fontSize="small" />
            </IconButton>
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
};
