// @ts-nocheck
/**
 * This file implements a catch-all route that renders the user-facing pages
 * generated by Puck. For any route visited (with exception of other hardcoded
 * pages in /app), it will check your database (via `getPage`) for a Puck page
 * and render it using <Render>.
 *
 * All routes produced by this page are statically rendered using incremental
 * static site generation. After the first visit, the page will be cached as
 * a static file. Subsequent visits will receive the cache. Publishing a page
 * will invalidate the cache as the page is written in /api/puck/route.ts
 */

import { Client } from "./client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPage } from "../../lib/get-page";

export async function generateMetadata({
  params: { puckPath = [] },
}: {
  params: { puckPath: string[] };
}): Promise<Metadata> {
  const path = `/${puckPath.join("/")}`;
  const page = await getPage(path);
  const title = page?.root.props.title;

  return {
    title: title || "Untitled",
  };
}

export default async function Page({
  params: { puckPath = [] },
}: {
  params: { puckPath: string[] };
}) {
  const path = `/${puckPath.join("/")}`;
  const data = await getPage(path);

  if (!data) {
    return notFound();
  }

  return <Client data={data} />;
}

// Force Next.js to produce static pages: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
// Delete this if you need dynamic rendering, such as access to headers or cookies
export const dynamic = "force-static";
