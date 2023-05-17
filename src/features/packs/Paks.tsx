import React, { useState } from "react";
import { Button, ButtonGroup, InputAdornment, TextField } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import s from "./styles.module.css";

export const Packs = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  function handleButtonClick(buttonIndex: number) {
    setActiveButton(buttonIndex);
  }
  return (
    <>
      <div className={s.packsHeader}>
        <h1>Packs list</h1>
        <Button type={"submit"} variant={"contained"} color={"primary"}>
          Add new pack
        </Button>
      </div>
      <div className={s.packsFilterTab}>
        <div className={s.packsSearch}>
          <label htmlFor={"search"}>Search</label>
          <TextField
            id="search"
            variant="outlined"
            name={"search"}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={s.packsShowSelect}>
          <label htmlFor={"showPacks"}>Show packs cards</label>
          <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
            <Button
              sx={{
                margin: 0,
                borderRadius: "4px",
                color: activeButton === 0 ? "#ffffff" : "",
              }}
              onClick={() => handleButtonClick(0)}
            >
              My
            </Button>
            <Button
              sx={{
                margin: 0,
                borderRadius: "4px",
                color: activeButton === 1 ? "#ffffff" : "",
              }}
              onClick={() => handleButtonClick(1)}
            >
              All
            </Button>
          </ButtonGroup>
        </div>
        <div className={s.packsNumberOfCards}>
          <label htmlFor={"price"}>Number of cards</label>
          <input type={"number"} name={"price"} id={"price"} />
        </div>
        <FilterAltIcon color="primary" fontSize="small" />
      </div>
    </>
  );
};
