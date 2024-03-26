import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import sharp from "sharp";

export const POST = async (req, res) => {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = path.parse(file.name).name + ".webp";

  try {
    const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      webpBuffer
    );
    return NextResponse.json({ Message: "Success", status: 201, filename });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};