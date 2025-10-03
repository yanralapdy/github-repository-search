import { ChevronDownIcon } from "../assets/svgs/ChevronDownIcon";
import type { GitHubUser } from "../types/github_repo";
import RepositoryList from "./RepositoryList";

const UserList: React.FC<{
  users: GitHubUser[];
  activeUser: string | null;
  searchedFor: string;
  toggleUser: (login: string) => void;
}> = ({ users, activeUser, searchedFor, toggleUser }) => {
  return (
    <div className="mt-7">
      {users.length > 0 && (
        <p className="text-gray-400 mb-4">Showing users for "{searchedFor}"</p>
      )}
      <ul className="space-y-4">
        {users.map((user) => {
          const isActive = activeUser === user.login;
          return (
            <li
              key={user.id}
              className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 shadow-md"
            >
              <button
                onClick={() => toggleUser(user.login)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-700/50 focus:outline-none focus:bg-gray-700/50"
                aria-expanded={isActive}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={user.avatar_url}
                    alt={`${user.login}'s avatar`}
                    className="h-12 w-12 rounded-full"
                  />
                  <span className="font-semibold text-xl">{user.login}</span>
                </div>
                <ChevronDownIcon
                  className={`h-6 w-6 transition-transform duration-300 ${
                    isActive ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {isActive && (
                <div className="p-4 border-t border-gray-700">
                  <RepositoryList username={user.login} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList