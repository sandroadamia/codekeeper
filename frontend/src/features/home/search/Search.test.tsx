import { waitFor, screen } from "@testing-library/react";
import { setupStore } from "../../../store/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { it, describe, expect } from "vitest";
import Search from "./Search";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const store = setupStore();

const SearchComponent = ({
  initialEntries = ["/"],
}: {
  initialEntries?: string[];
}) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Search />
  </MemoryRouter>
);

describe("Search component", () => {
  it("Should display container with text for an empty search term", () => {
    const { getByPlaceholderText } = renderWithProviders(<SearchComponent />, {
      store,
    });
    expect(
      getByPlaceholderText('Search for (e.g "Cosmos")')
    ).toBeInTheDocument();
  });

  it("Explore button should be disabled for empty search term", async () => {
    const { getByRole } = renderWithProviders(<SearchComponent />, { store });
    expect(getByRole("button", { name: /Browse/i })).toBeDisabled();
  });

  it("Explore button should be enabled for any search term", async () => {
    const { getByRole } = renderWithProviders(<SearchComponent />, { store });
    await userEvent.type(screen.getByPlaceholderText('Search for (e.g "Cosmos")'), 'spacex')
    await waitFor(() => {
      expect(getByRole("button", { name: /Browse/i })).toBeEnabled();
    });
  });

  it("Explore button should be enabled when search term is inferred from query parameter", async () => {
    const { getByRole } = renderWithProviders(
      <SearchComponent initialEntries={["/?q=spacex"]} />,
      { store }
    );

    await waitFor(() => {
      expect(getByRole("button", { name: /Browse/i })).toBeEnabled();
    });
  });

  it("Start and end year filter should infer query parameters", async () => {
    const { getByPlaceholderText } = renderWithProviders(
      <SearchComponent
        initialEntries={["/?q=spacex&startYear=2021&endYear=2023"]}
      />,
      { store }
    );

    await waitFor(() => {
      expect(getByPlaceholderText("Start year")).toHaveValue("2021");
      expect(getByPlaceholderText("End year")).toHaveValue("2023");
    });
  });
});
