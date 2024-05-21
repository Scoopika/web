import type { NextApiRequest, NextApiResponse } from "next";
import { Scoopika, Container } from "@scoopika/scoopika";

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  container.handleRequest({
    request: req.body,
    stream: (s) => res.write(s),
    end: () => res.end(),
  });
}
