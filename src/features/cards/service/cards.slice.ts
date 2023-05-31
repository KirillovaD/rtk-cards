import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "common/api/common.api";
import {
  AddCardResponseType,
  ArgCreateCardType,
  FetchCardsResponseType,
} from "features/cards/service/cards.slice.types";

export const cardsSlice = createApi({
  reducerPath: "cardsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include",
  }),
  tagTypes: ["Card"],
  endpoints: (build) => {
    return {
      getCards: build.query<FetchCardsResponseType, string>({
        query: (packId) => {
          return {
            method: "GET",
            url: "cards/card",
            params: {
              cardsPack_id: packId,
              pageCount: 7,
            },
          };
        },
        providesTags: ["Card"],
      }),
      addCard: build.mutation<AddCardResponseType, ArgCreateCardType>({
        query: (card) => {
          return {
            method: "POST",
            url: "cards/card",
            body: {
              card,
            },
          };
        },
        invalidatesTags: ["Card"],
      }),
    };
  },
});

export const { useGetCardsQuery, useAddCardMutation } = cardsSlice;
