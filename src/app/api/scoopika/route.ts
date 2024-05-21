import { Scoopika, Container } from "@scoopika/scoopika";
import { NextRequest, NextResponse } from "next/server";

const scoopika = new Scoopika({
  token: process.env.SCOOPIKA_TOKEN || "",
  engines: {
    fireworks: process.env.FIREWORKS_TOKEN,
  },
});

const container = new Container({
  scoopika,
  agents: ["7c47b7f1-b632-449e-8247-f55962415f0a"],
});

export async function POST(req: NextRequest) {

    const requestBody = await req.json();

    const stream = new ReadableStream({
        start(controller) {
            container.handleRequest({
                request: requestBody,
                stream: (s) => {
                    controller.enqueue(s);
                },
                end: () => {
                    controller.close();
                },
            });
        }
    })

  return new NextResponse(stream);
}