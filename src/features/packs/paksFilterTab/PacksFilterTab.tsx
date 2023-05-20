import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, ButtonGroup, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Slider from "@mui/material/Slider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import s from "./stylle.module.css";
import { useAppSelector } from "common/hooks";
import { selectProfile } from "features/auth/auth.selectors";
import { useActions } from "common/hooks/useActions";
import { packsThunks } from "features/packs/packs.slice";
import { useSearchParams } from "react-router-dom";

export const PacksFilterTab: FC = () => {
  const [find, setFind] = useState("");
  const [activeButton, setActiveButton] = useState<number>(1);
  const profile = useAppSelector(selectProfile);
  const { getPacks } = useActions(packsThunks);
  const handleButtonClick = (buttonIndex: number) => {
    setActiveButton(buttonIndex);
    getPacks(buttonIndex ? {} : { user_id: profile?._id });
  };
  const minmin = 0;
  const maxmax = 100;
  const [minNum, setMinNumCards] = useState(minmin);
  const [maxNum, setMaxNum] = useState(maxmax);

  const [cardsRangeValue, setCardsRangeValue] = useState([0, 100]);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFind(event.currentTarget.value);
    const findQ: any = event.currentTarget.value ? { find: event.currentTarget.value } : {};
    const { find, ...props } = Object.fromEntries(searchParams);
    setSearchParams({ ...props, findQ });
  };
  const sendQuery = (value: string) => {
    getPacks({ packName: value });
  };
  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    sendQuery(params.find || "");
    setFind(params.find || "");
  }, [searchParams]);

  const numberCardsChangeHandler = (event: any, newValue: any) => {
    setMinNumCards(newValue[0]);
    setMaxNum(newValue[1]);
    setCardsRangeValue(newValue);
  };
  return (
    <div className={s.packsFilterTab}>
      <div className={s.packsSearch}>
        <label htmlFor={"search"}>Search</label>
        <TextField
          value={find}
          id="search"
          variant="outlined"
          name={"search"}
          size="small"
          onChange={searchHandler}
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
              backgroundColor: activeButton === 0 ? "#c4d6ff" : "",
              color: activeButton === 0 ? "#001a58" : "",
            }}
            onClick={() => handleButtonClick(0)}
          >
            My
          </Button>
          <Button
            sx={{
              margin: 0,
              borderRadius: "4px",
              backgroundColor: activeButton === 1 ? "#c4d6ff" : "",
              color: activeButton === 0 ? "#001a58" : "",
            }}
            onClick={() => handleButtonClick(1)}
          >
            All
          </Button>
        </ButtonGroup>
      </div>
      <div className={s.packsNumberOfCards}>
        <label htmlFor={"price"}>Number of cards</label>
        <div className={s.packsSlider}>
          <TextField
            type="number"
            variant="outlined"
            sx={{ maxWidth: "100px" }}
            size="small"
            value={minNum}
            onChange={(e) => {
              setMinNumCards(Number(e.target.value));
              setCardsRangeValue([Number(e.target.value), cardsRangeValue[1]]);
            }}
          />
          <Slider
            getAriaLabel={() => "Price range"}
            value={cardsRangeValue}
            onChange={numberCardsChangeHandler}
            valueLabelDisplay="auto"
            min={minmin}
            max={maxmax}
            size="small"
          />
          <TextField
            type="number"
            variant="outlined"
            sx={{ maxWidth: "100px" }}
            size="small"
            value={maxNum}
            onChange={(e) => {
              setMaxNum(Number(e.target.value));
              setCardsRangeValue([cardsRangeValue[0], Number(e.target.value)]);
            }}
          />
        </div>
      </div>
      <FilterAltIcon color="primary" sx={{ alignSelf: "flex-end" }} />
    </div>
  );
};
