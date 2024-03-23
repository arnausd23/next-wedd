import { NextResponse } from "next/server";
import path from "path";
import { writeFile, appendFile } from "fs/promises";

export const POST = async (req, res) => {
  const body = await req.json()

  const rows = [
    body,
  ];

  const csvContent = rows.map((e) => e.join(",")).join("\n");

  try {
    await appendFile('output.csv', csvContent + '\n', 'utf8');
    console.log('It\'s saved!');
    return NextResponse.json({ Message: "Success", status: 201, csvContent });
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};