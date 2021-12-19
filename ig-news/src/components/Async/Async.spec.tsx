import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Async } from ".";

describe("Asynchronous component", () => {
  it("renders correctly", async () => {
    render(<Async />);

    expect(screen.getByText("hello world")).toBeInTheDocument();

    // same: waitFor
    // await waitForElementToBeRemoved(screen.queryByText("Button"));

    await waitFor(() => {
      return expect(screen.getByText("Button")).toBeInTheDocument();
    });
  });
});
