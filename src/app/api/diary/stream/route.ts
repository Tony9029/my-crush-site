// src/app/api/diary/stream/route.ts
import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VER_KEY = "diary:version";

/**
 * GET /api/diary/stream
 * Server-Sent Events: gửi "update" khi diary:version thay đổi.
 */
export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(`event: ${event}\n`));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // chào một cái
      send("open", { ok: true });

      let last = Number((await kv.get(VER_KEY)) || 0);

      const tick = async () => {
        try {
          const v = Number((await kv.get(VER_KEY)) || 0);
          if (v !== last) {
            last = v;
            send("update", { v, at: Date.now() });
          } else {
            // giữ kết nối
            send("ping", Date.now());
          }
        } catch (e) {
          console.error("SSE tick error:", e);
          clearInterval(timer);
          controller.close();
        }
      };

      // poll 2s/lần là đủ nhẹ
      const timer = setInterval(tick, 2000);
      // gọi lần đầu ngay
      await tick();

      // đóng khi client ngắt
      // @ts-ignore (Node readable stream does not expose signal in types)
      controller.signal?.addEventListener?.("abort", () => {
        clearInterval(timer);
        controller.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
