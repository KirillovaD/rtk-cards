import React, { FC, useState } from "react";
import { Button, ButtonGroup, TextField } from "@mui/material";
import Slider from "@mui/material/Slider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import s from "./stylle.module.css";
import { useAppSelector } from "common/hooks";
import { selectProfile } from "features/auth/auth.selectors";
import { useActions } from "common/hooks/useActions";
import { packsThunks } from "features/packs/packs.slice";
import { InputSearch } from "common/components/inputs/inputSearch/InputSearch";
import { useSearchParams } from "react-router-dom";
import { selectPacks } from "features/packs/packs.selectors";

export const PacksFilterTab: FC = () => {
  const [activeButton, setActiveButton] = useState<number>(1);
  const profile = useAppSelector(selectProfile);
  const packs = useAppSelector(selectPacks);
  const [_, setSearchParams] = useSearchParams();
  const { getPacks } = useActions(packsThunks);

  const handleButtonClick = (buttonIndex: number) => {
    setActiveButton(buttonIndex);
    getPacks(buttonIndex ? {} : { user_id: profile?._id });
  };

  const minmin = 0;
  const maxmax = packs.maxCardsCount;
  const [minNum, setMinNumCards] = useState(minmin);
  const [maxNum, setMaxNum] = useState(maxmax);
  const [cardsRangeValue, setCardsRangeValue] = useState([0, packs.maxCardsCount]);

  const numberCardsChangeHandler = (event: any, newValue: any) => {
    setMinNumCards(newValue[0]);
    setMaxNum(newValue[1]);
    setCardsRangeValue(newValue);
    setSearchParams({ min: newValue[0], max: newValue[1] });
  };
  return (
    <div className={s.packsFilterTab}>
      <InputSearch />
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
