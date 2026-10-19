import { useEffect, useState } from "react";
import { Github, Star } from "lucide-react";
import snapshot from "./github-stars.json";

export function useGitHubStars() {
  const [stars, setStars] = useState(snapshot.stars);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    fetch("https://api.github.com/repos/cuga-project/cuga-agent", {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub star count unavailable");
        return response.json();
      })
      .then((data: { stargazers_count?: unknown }) => {
        const count = data.stargazers_count;
        if (
          typeof count === "number" &&
          Number.isSafeInteger(count) &&
          count >= 0
        ) {
          setStars(count);
        }
      })
      .catch(() => {
        /* Retain the last verified public count when GitHub is unavailable. */
      })
      .finally(() => window.clearTimeout(timeout));
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);
  return stars;
}

export function GitHubStars({
  stars,
  compact = false,
}: {
  stars: number;
  compact?: boolean;
}) {
  const count = stars.toLocaleString("en-US");
  return (
    <a
      className={`bs-star-link${compact ? " bs-star-compact" : ""}`}
      href="https://github.com/cuga-project/cuga-agent"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Star us on GitHub — ${count} stars`}
    >
      <Github size={compact ? 17 : 20} />
      <span className="bs-star-label">
        {compact ? "Star us" : "Star us on GitHub"}
      </span>
      <span className="bs-star-count">
        <Star size={14} fill="currentColor" />
        {count}
      </span>
    </a>
  );
}
