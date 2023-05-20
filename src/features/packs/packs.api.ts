import { instance, instanceHeroku } from "common/api/common.api";

export const packsApi = {
  getPacks: (params: GetPacksPayloadType) => {
    return instance.get<FetchPacksResponseType>("/cards/pack", { params });
  },
  createPack: (cardsPack: ArgCreatePackType) => {
    return instance.post<CreatePackResponseType>("cards/pack", { cardsPack });
  },
  removePack: (id: string) => {
    return instance.delete<RemovePackResponseType>(`cards/pack?id=${id}`);
  },
  updatePack: (cardsPack: PackType) => {
    return instance.put<UpdatePackResponseType>("cards/pack", { cardsPack });
  },
};

export type GetPacksPayloadType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
  block?: boolean;
};

export type PackType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: string;
  more_id: string;
  __v: number;
};
export type FetchPacksResponseType = {
  cardPacks: PackType[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
  token: string;
  tokenDeathTime: number;
};
type CreatePackResponseType = {
  newCardsPack: PackType;
  token: string;
  tokenDeathTime: number;
};

type RemovePackResponseType = {
  deletedCardsPack: PackType;
  token: string;
  tokenDeathTime: number;
};

export type UpdatePackResponseType = {
  updatedCardsPack: PackType;
  token: string;
  tokenDeathTime: number;
};

export type ArgCreatePackType = {
  name?: string;
  deckCover?: string;
  private?: boolean;
};
