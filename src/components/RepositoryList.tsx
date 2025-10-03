import { useEffect, useState } from "react";
import type { GitHubRepo } from "../types/github_repo";
import { StarIcon } from "../assets/svgs/StarIcon";
import { Spinner } from "../assets/svgs/Spinner";
import { getGithub } from "../apis/githubApi";

const RepositoryList: React.FC<{ username: string }> = ({ username }) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedRepos = await getGithub.getList<GitHubRepo[]>(
          `/users/${username}/repos?sort=updated&direction=desc`
        );
        setRepos(fetchedRepos);
      } catch (err) {
        if (err instanceof Error) {
          setError(`Failed to fetch repositories. ${err.message}`);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="text-red-400 p-4 bg-gray-700 rounded-md">{error}</div>
    );
  if (repos.length === 0)
    return (
      <div className="p-4 bg-gray-700 rounded-md">
        This user has no public repositories.
      </div>
    );

  return (
    <div className="space-y-3 mt-4 pl-4 border-l-2 border-gray-600">
      {repos.map((repo) => (
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          key={repo.id}
          className="block p-4 bg-gray-700 border border-blue-400 rounded-lg hover:[&_*]:text-white hover:bg-gray-600 transition-colors duration-200"
        >
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-blue-300 break-all">
              {repo.name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-300 shrink-0 ml-4">
              <span>{repo.stargazers_count}</span>
              <StarIcon />
            </div>
          </div>
          <p className="text-gray-400 mt-1 text-sm">
            {repo.description || "No description provided."}
          </p>
        </a>
      ))}
    </div>
  );
};

export default RepositoryList;
