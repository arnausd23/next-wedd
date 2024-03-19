import { Data } from "@measured/puck";
import fs from "fs";

// Replace with call to your database
export const getPage = async (path: string) => {
  const GithubToken = process.env.GITHUB_TOKEN;
  const GistId = process.env.GIST_ID;
  const content = fs.readFileSync("database.json", "utf-8");

  const response = await fetch(`https://api.github.com/gists/${GistId}`, {
    method: "GET",
    headers: {
      Authorization: `token ${GithubToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  const data = await response.json();
  const fileContent = data.files["database.json"].content;
  const parsedData = JSON.parse(data.files["database.json"].content);

  if (!parsedData) {
    throw new Error("Database not found");
  }

  return parsedData[path];
};
