import { Data } from "@measured/puck";
import fs from "fs";

// Replace with call to your database
export const getPage = (path: string) => {
  const GithubToken = process.env.GITHUB_TOKEN;
  const GistId = process.env.GIST_ID;
  const content = fs.readFileSync("database.json", "utf-8");

  fetch(`https://api.github.com/gists/${GistId}`, {
    method: "PATCH",
    headers: {
      Authorization: `token ${GithubToken}`,
      Accept: "application/vnd.github.v3+json",
    },
    body: JSON.stringify({
      description: "Updated gist",
      files: {
        "database.json": {
          content,
        },
      },
    }),
  }).then((response) => response.json());
  // .then((data) => console.log(data.files["database.json"].content));

  const allData: Record<string, Data> | null = fs.existsSync("database.json")
    ? JSON.parse(fs.readFileSync("database.json", "utf-8"))
    : null;

  if (!allData) {
    throw new Error("Database not found");
  }

  return allData[path];
};
