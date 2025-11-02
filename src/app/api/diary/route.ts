import { kv } from "@vercel/kv";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Entry = { day: number; text: string; ts: number };

const LIST_KEY = "diary:list";
const VER_KEY = "diary:version";
const PASS = process.env.DIARY_PASS || "";

/** GET /api/diary -> trả về entries (desc theo day) */
export async function GET() {
  const entries: Entry[] = (await kv.get(LIST_KEY)) || [];
  entries.sort((a, b) => b.day - a.day);
  return NextResponse.json(entries, {
    headers: { "Cache-Control": "no-store" },
  });
}

/** POST /api/diary -> lưu/ghi đè entry theo day
 * Body: { day:number; text:string }
 * Header: x-pass: 7306
 */
export async function POST(req: NextRequest) {
  try {
    const pass = req.headers.get("x-pass") || "";
    if (!PASS || pass !== PASS)
      return new NextResponse("Unauthorized", { status: 401 });

    const body = (await req.json()) as Partial<Entry>;
    if (
      typeof body.day !== "number" ||
      !body.text ||
      !String(body.text).trim()
    ) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const newEntry: Entry = {
      day: body.day,
      text: String(body.text).trim(),
      ts: Date.now(),
    };

    const list: Entry[] = (await kv.get(LIST_KEY)) || [];
    const others = list.filter((e) => e.day !== newEntry.day);
    const updated = [newEntry, ...others].sort((a, b) => b.day - a.day);

    await kv.set(LIST_KEY, updated);
    await kv.incr(VER_KEY); // phát tín hiệu cho SSE

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("POST /api/diary error:", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
