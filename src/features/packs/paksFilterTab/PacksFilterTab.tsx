import React, { FC, useState } from "react";
import { Button, ButtonGroup, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Slider from "@mui/material/Slider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import s from "./stylle.module.css";

export const PacksFilterTab: FC = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const handleButtonClick = (buttonIndex: number) => {
    setActiveButton(buttonIndex);
  };
  const minmin = 0;
  const maxmax = 100;
  const [minNum, setMinNumCards] = useState(minmin);
  const [maxNum, setMaxNum] = useState(maxmax);

  const [cardsRangeValue, setCardsRangeValue] = useState([0, 100]);

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
