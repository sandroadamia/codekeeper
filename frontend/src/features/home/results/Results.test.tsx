import { waitFor } from "@testing-library/react";
import { setupStore } from "../../../store/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { it, describe, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Results from "./Results";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const store = setupStore();

const ResultsComponent = ({
  initialEntries = ["/"],
}: {
  initialEntries?: string[];
}) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Results />
  </MemoryRouter>
);

describe("Results component", () => {
  it("Given a search term masonry grid should have a list of items", async () => {
    const { getByTestId } = renderWithProviders(
      <ResultsComponent initialEntries={["/?q=spacex&endYear=2023"]} />,
      { store }
    );

    await waitFor(() => {
      const element = getByTestId("masonry");
      expect(element.children.length).toEqual(25);
    });
  });

  it("Change posts per page drop down should display relevant number of items", async () => {
    const { getByTestId } = renderWithProviders(
      <ResultsComponent initialEntries={["/?q=spacex&endYear=2023"]} />,
      { store }
    );

    await waitFor(() => {
      expect(getByTestId("change-posts-per-page")).toBeInTheDocument();
    });

    await userEvent.selectOptions(getByTestId("change-posts-per-page"), "50");

    await waitFor(() => {
      expect(getByTestId("masonry").children.length).toEqual(50);
    });
  });

  it("Change posts per page drop down value should be inferred from query parameter", async () => {
    const { getByTestId } = renderWithProviders(
      <ResultsComponent
        initialEntries={["/?q=spacex&endYear=2023&postsPerPage=25"]}
      />,
      { store }
    );

    await waitFor(() => {
      expect(getByTestId("masonry").children.length).toEqual(25);
    });
  });

  it("Next page button should page through results", async () => {
    const { getByTestId, getByText } = renderWithProviders(
      <ResultsComponent
        initialEntries={["/?q=spacex&endYear=2023&postsPerPage=25"]}
      />,
      { store }
    );
    act(() => {
      getByTestId("next-page").click();
    });

    await waitFor(() => {
      getByText("Loading...");
    });
    await waitFor(() => {
      expect(getByTestId("masonry").children[0].innerHTML).toContain(
        "CCP Astronauts Tour SpaceX Facility"
      );
    });
  });
});
