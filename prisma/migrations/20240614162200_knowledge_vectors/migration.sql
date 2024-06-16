/*
  Warnings:

  - Added the required column `vectors` to the `Knowledge` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Knowledge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vectors" TEXT NOT NULL
);
INSERT INTO "new_Knowledge" ("agentId", "fileId", "id", "name", "userId") SELECT "agentId", "fileId", "id", "name", "userId" FROM "Knowledge";
DROP TABLE "Knowledge";
ALTER TABLE "new_Knowledge" RENAME TO "Knowledge";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
