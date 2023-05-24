import { createSlice } from "@reduxjs/toolkit";
import { thunkTryCatch } from "common/utils/thunkTryCatch";
import {
  ArgCreatePackType,
  FetchPacksResponseType,
  GetPacksPayloadType,
  packsApi,
  PackType,
} from "features/packs/packs.api";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";

const slice = createSlice({
  name: "packs",
  initialState: {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 7,
    cardPacksTotalCount: 2000,
    minCardsCount: 0,
    maxCardsCount: 100,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      const packsPage = action.payload.packsPage;
      state.cardPacks = packsPage.cardPacks;
      state.page = packsPage.page;
      state.pageCount = packsPage.pageCount;
      state.cardPacksTotalCount = packsPage.cardPacksTotalCount;
      state.minCardsCount = packsPage.minCardsCount;
      state.maxCardsCount = packsPage.maxCardsCount;
    });
  },
});

const getPacks = createAppAsyncThunk<{ packsPage: FetchPacksResponseType }, GetPacksPayloadType>(
  "packs/getPacks",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.getPacks({ ...arg, pageCount: arg.pageCount ?? 5 });
      return { packsPage: res.data };
    });
  }
);

const createPack = createAppAsyncThunk<void, ArgCreatePackType>("packs/createPack", async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    await packsApi.createPack(arg);
    dispatch(getPacks({}));
  });
});

const deletePack = createAppAsyncThunk<void, string>("packs/removePack", async (id, thunkAPI) => {
  const { dispatch } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    await packsApi.removePack(id);
    dispatch(getPacks({}));
  });
});

const updatePack = createAppAsyncThunk<void, PackType>("packs/updatePack", async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    await packsApi.updatePack(arg);
    dispatch(getPacks({}));
  });
});

export const packsReducer = slice.reducer;
export const packsThunks = { getPacks, createPack, deletePack, updatePack };
