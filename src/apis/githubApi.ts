const base_url = import.meta.env.VITE_API_URL;

export const getGithub = {
  async getList<T>(path: string): Promise<T> {
    const response = await fetch(`${base_url}${path}`, {
      headers: { Accept: "application/vnd.github.v3+json" },
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "An unknown error occured." }));
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },
};
