import React, { ChangeEvent, FC, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import s from "./style.module.css";
import { useSearchParams } from "react-router-dom";

export const InputSearch: FC = () => {
  const [find, setFind] = useState("");
  const [_, setSearchParams] = useSearchParams();
  const [timerId, setTimerId] = useState<number | undefined>(undefined);

  const searchHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      setFind(event.target.value);

      timerId && clearTimeout(timerId);
      let newId = setTimeout(() => {
        setSearchParams({ find: event.target.value });
        setTimerId(undefined);
      }, 1500);
      setTimerId(+newId);
    } else {
      setFind("");
    }
  };

  return (
    <div className={s.packsSearch}>
      <label htmlFor={"search"}>Search</label>
      <TextField
        id="search"
        variant="outlined"
        name={"search"}
        onChange={searchHandler}
        value={find}
        size={"small"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
