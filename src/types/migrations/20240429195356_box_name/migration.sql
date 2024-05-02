/*
  Warnings:

  - Added the required column `name` to the `Box` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Box" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "payload" TEXT NOT NULL
);
INSERT INTO "new_Box" ("id", "payload", "userId") SELECT "id", "payload", "userId" FROM "Box";
DROP TABLE "Box";
ALTER TABLE "new_Box" RENAME TO "Box";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
