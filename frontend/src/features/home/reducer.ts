import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface SearchFormState {
  q: string;
  page: number;
  startYear?: number;
  endYear?: number;
  postsPerPage: number;
}

export const initialState: SearchFormState = {
  q: "",
  page: 1,
  postsPerPage: 25,
};

const searchFormSlice = createSlice({
  name: "searchForm",
  initialState,
  reducers: {
    setFormValues: (
      state,
      action: PayloadAction<{
        q?: string;
        startYear?: number;
        endYear?: number; 
        postsPerPage: number;
        page: number;
      }>
    ) => {
      state.q = action.payload.q;
      state.startYear = action.payload.startYear;
      state.endYear = action.payload.endYear;
      state.postsPerPage = action.payload.postsPerPage;
      state.page = action.payload.page;
    }
  },
});

const reducer = searchFormSlice.reducer;

export default reducer;

export const { setFormValues } = searchFormSlice.actions;
export const { setPostsPerPage } = searchFormSlice.actions;
