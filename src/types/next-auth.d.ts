/* eslint-disable no-unused-vars */

import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    plan: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      plan: string;
    };
  }
}
