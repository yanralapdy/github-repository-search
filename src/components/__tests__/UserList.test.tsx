import { render, screen } from "@testing-library/react";
import UserList from "../UserList";
import type { GitHubUser } from "../../types/github_repo";

describe("UserList", () => {
  it("renders users", () => {
    const users: GitHubUser[] = [
      { id: 1, login: "octocat", avatar_url: "", html_url: "" },
      { id: 2, login: "octodog", avatar_url: "", html_url: "" },
    ];

    render(<UserList users={users} activeUser={""} searchedFor="octo" toggleUser={(a) => console.log(a)} />);

    expect(screen.getByText("octocat")).toBeInTheDocument();
    expect(screen.getByText("octodog")).toBeInTheDocument();
  });
});
