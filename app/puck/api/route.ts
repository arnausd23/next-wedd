import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import fs from "fs";

export async function POST(request: Request) {
  const payload = await request.json();

  const GithubToken = process.env.GITHUB_TOKEN;
  const GistId = process.env.GIST_ID;
  const content = fs.readFileSync("database.json", "utf-8");

  try {
    const response = await fetch(`https://api.github.com/gists/${GistId}`, {
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
    });

    const data = await response.json();
    const fileContent = data.files["database.json"].content;
    const updatedData = {
      ...fileContent,
      [payload.path]: payload.data,
    };

    fs.writeFileSync("database.json", JSON.stringify(updatedData));

    // Purge Next.js cache
    revalidatePath(payload.path);

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error });
  }
}
