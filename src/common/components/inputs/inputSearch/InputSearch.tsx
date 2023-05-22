import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import s from "./style.module.css";
import { useSearchParams } from "react-router-dom";
import { useActions } from "common/hooks/useActions";
import { packsThunks } from "features/packs/packs.slice";

export const InputSearch: FC = () => {
  const [find, setFind] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [timerId, setTimerId] = useState<number | undefined>(undefined);
  const { getPacks } = useActions(packsThunks);

  const searchHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      setFind(event.target.value);
      setSearchParams({ find: event.target.value });

      timerId && clearTimeout(timerId);
      let newId = setTimeout(() => {
        sendQuery(event.target.value);
        setTimerId(undefined);
      }, 1500);
      setTimerId(+newId);
    } else {
      setFind("");
    }
  };

  const sendQuery = (find: string) => {
    getPacks({ packName: find });
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    sendQuery(params.find || "");
    setFind(params.find || "");
  }, [searchParams, find]);

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
