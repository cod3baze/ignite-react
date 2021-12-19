import { render, screen } from "@testing-library/react";
import Home from "../../pages";

jest.mock("next/router");
jest.mock("next-auth/client", () => {
  return {
    useSession: () => [null, false],
  };
});

describe("Home page", () => {
  it("renders correctly", () => {
    render(<Home product={{ priceId: "fake-price", amount: "R$9,99" }} />);

    expect(screen.getByText("for R$9,99 monthly.")).toBeInTheDocument();
  });
});
