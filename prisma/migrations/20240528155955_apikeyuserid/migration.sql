/*
  Warnings:

  - Added the required column `userId` to the `Apikeys` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Apikeys" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL
);
INSERT INTO "new_Apikeys" ("id", "name", "value") SELECT "id", "name", "value" FROM "Apikeys";
DROP TABLE "Apikeys";
ALTER TABLE "new_Apikeys" RENAME TO "Apikeys";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
