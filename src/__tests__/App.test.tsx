import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import type { Mock } from "vitest";

beforeEach(() => {
  global.fetch = vi.fn();
});

test("shows error if search is empty", async () => {
  render(<App />);
  fireEvent.click(screen.getByText("Search"));
  expect(await screen.findByText(/please enter/i)).toBeInTheDocument();
});

test("searches and shows users", async () => {
  (fetch as Mock).mockResolvedValueOnce({
    ok: true,
    json: () =>
      Promise.resolve({ items: [{ login: "yanralapdy", id: 1 }] }),
  });

  render(<App />);
  fireEvent.change(screen.getByPlaceholderText(/enter a github/i), {
    target: { value: "yanral" },
  });
  fireEvent.click(screen.getByText("Search"));

  await waitFor(() => {
    expect(screen.getByText("yanralapdy")).toBeInTheDocument();
  });
});
