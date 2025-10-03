import { render, screen, waitFor } from "@testing-library/react";
import RepositoryList from "../RepositoryList";
import { vi } from "vitest"
import type { Mock } from "vitest";

beforeEach(() => {
  global.fetch = vi.fn();
});

test("shows spinner while loading", () => {
  (fetch as Mock).mockReturnValue(new Promise(() => {})); // never resolves
  render(<RepositoryList username="test" />);
  expect(screen.getByRole("status")).toBeInTheDocument(); // Spinner should have role="status"
});

test("shows repos after fetch", async () => {
  (fetch as Mock).mockResolvedValueOnce({
    ok: true,
    json: () =>
      Promise.resolve([{ id: 1, name: "repo1", html_url: "#", stargazers_count: 3 }]),
  });

  render(<RepositoryList username="test" />);
  await waitFor(() => {
    expect(screen.getByText("repo1")).toBeInTheDocument();
  });
});
