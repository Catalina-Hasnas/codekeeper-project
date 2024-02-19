import { Header } from "./Header";
import { render, screen } from "utils/testUtils/render";

describe("Simple working test", () => {
  test("renders header", () => {
    render(<Header />);
    expect(screen.getByText("Nasa Images")).toBeInTheDocument();
  });
});
