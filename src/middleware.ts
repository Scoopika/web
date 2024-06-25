export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/app",
    "/app/agents",
    "/app/boxes",
    "/app/new-box",
    "/app/new-agent",
    "/app/usage",
    "/app/playground"
  ],
};
