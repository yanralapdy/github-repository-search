import { useCallback, useState, type FormEvent, useEffect } from "react";
import "./App.css";
import type { GitHubUser, UserSearchResult } from "./types/github_repo";
import { getGithub } from "./apis/githubApi";
import UserList from "./components/UserList";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeUser, setActiveUser] = useState<string | null>(null);
  const [searchedFor, setSearchedFor] = useState<string>("");

  useEffect(() => {
    document.title = "Github Search"
  }, [])

  const handleSearch = useCallback(
    async (e: FormEvent) => {

      e.preventDefault();
      if (!searchTerm.trim()) {
        setError("Please enter a username to search.");
        return;
      }

      setIsLoading(true);
      setError(null);
      setUsers([]);
      setActiveUser(null);
      setSearchedFor(searchTerm);

      try {
        const result = await getGithub.getList<UserSearchResult>(
          `/search/users?q=${searchTerm}&per_page=5`
        );
        if (result.items.length === 0) {
          setError(`No users found for "${searchTerm}".`);
        }
        setUsers(result.items);
      } catch (err) {
        if (err instanceof Error) {
          setError(`Failed to search for users. ${err.message}`);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [searchTerm]
  );

  const toggleUser = (login: string) => {
    setActiveUser((prev) => (prev === login ? null : login));
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            GitHub Repository Explorer
          </h1>
          <p className="text-gray-400 mt-2">
            Find users and browse their public repositories.
          </p>
        </header>

        <main>
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 mb-6 sticky top-4 bg-gray-900 py-2 z-10"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter a GitHub username"
              className="w-full px-4 py-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </form>

          {error && (
            <div className="text-center text-red-400 p-4 bg-red-900/50 rounded-lg">
              {error}
            </div>
          )}

          <UserList activeUser={activeUser} searchedFor={searchedFor} users={users} toggleUser={toggleUser} />
        </main>
      </div>
    </div>
  );
}

export default App;
