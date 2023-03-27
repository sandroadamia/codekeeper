import reducer, {
  SearchFormState,
  setFormValues,
} from "./reducer";

describe("searchSlice reducer", () => {
  const initialState: SearchFormState = {
    q: "",
    page: 1,
    postsPerPage: 25,
  };

  it("should handle initial state", () => {
    expect(reducer(initialState, { type: "unknown" })).toEqual({
      q: "",
      page: 1,
      postsPerPage: 25,
    });
  });

  it("should handle setFormValues action", () => {
    const actual = reducer(
      initialState,
      setFormValues({
        q: "test query",
        startYear: 2000,
        endYear: 2020,
        postsPerPage: 50,
        page: 1,
      })
    );

    expect(actual).toEqual({
      q: "test query",
      startYear: 2000,
      endYear: 2020,
      postsPerPage: 50,
      page: 1,
    });
  });
});
