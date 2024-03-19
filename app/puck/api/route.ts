import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import fs from "fs";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const GithubToken = process.env.GITHUB_TOKEN;
    const GistId = process.env.GIST_ID;
    const response = await fetch(`https://api.github.com/gists/${GistId}`, {
      method: "GET",
      headers: {
        Authorization: `token ${GithubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const data = await response.json();
    const fileContent = data.files["database.json"].content;
    const parsedData = JSON.parse(fileContent);

    const updatedData = {
      ...parsedData,
      [payload.path]: payload.data,
    };

    const res = await fetch(`https://api.github.com/gists/${GistId}`, {
      method: "PATCH",
      headers: {
        Authorization: `token ${GithubToken}`,
        Accept: "application/vnd.github.base64+json",
      },
      body: JSON.stringify({
        description: "Updated gist",
        files: {
          "database.json": {
            content: JSON.stringify(updatedData),
          },
        },
      }),
    });
    console.log(await res.json());
    // Purge Next.js cache
    revalidatePath(payload.path);

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error });
  }
}
