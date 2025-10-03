import { getGithub } from "../githubApi";
import type { Mock } from "vitest";

beforeEach(() => {
  global.fetch = vi.fn();
});

test("returns data when fetch succeeds", async () => {
  (fetch as Mock).mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ hello: "world" }),
  });

  const result = await getGithub.getList<{ hello: string }>("/test");
  expect(result.hello).toBe("world");
});

test("throws error when fetch fails", async () => {
  (fetch as Mock).mockResolvedValueOnce({
    ok: false,
    status: 404,
    json: () => Promise.resolve({ message: "Not found" }),
  });

  await expect(getGithub.getList("/bad")).rejects.toThrow("Not found");
});
