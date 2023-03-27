import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../utils/test-utils";
import Details from "./Details";
import { setupStore } from "../../store/store";
import { waitFor } from "@testing-library/react";
import { vi } from "vitest";

const store = setupStore();

const DetailsComponent = ({
  initialEntries = ["/"],
}: {
  initialEntries?: string[];
}) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Details />
  </MemoryRouter>
);

describe("Details component", () => {
  it("Should display details for a given nasa_id", async () => {
    const { getByTestId } = renderWithProviders(
      <DetailsComponent initialEntries={["/details/20212345678"]} />,
      { store }
    );

    await waitFor(() => {
      expect(getByTestId("details")).toBeInTheDocument();
    });
  });
})