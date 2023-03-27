import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { initialState } from "../home/reducer";
import { Response } from "./types";
console.log(import.meta.env.VITE_NASA_BASE_URL) 
export const nasaApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_NASA_BASE_URL }),
  tagTypes: ["Search"],
  endpoints: (builder) => ({
    getAssetsBySearchTerm: builder.query({
      query: ({
        q,
        startYear,
        endYear,
        page = initialState.page,
        postsPerPage = initialState.postsPerPage,
      }: {
        q?: string;
        startYear?: number;
        endYear?: number;
        page: number;
        postsPerPage: number;
      }) =>
        `search?media_type=image&q=${q}${
          startYear ? `&year_start=${startYear}` : ""
        }${
          endYear ? `&year_end=${endYear}` : ""
        }&page_size=${postsPerPage}&page=${page}`,
    }),
    getAssetByNasaId: builder.query({
      query: (nasaId: string) => `search?nasa_id=${nasaId}`,
      transformResponse: (response: Response) => ({
        ...response.collection.items[0].data[0],
        ...{image: response.collection.items[0].links[0].href}
      }),
    }),
  }),
});

export const { useGetAssetsBySearchTermQuery, useGetAssetByNasaIdQuery } =
  nasaApi;
