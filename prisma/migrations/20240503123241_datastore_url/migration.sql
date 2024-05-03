/*
  Warnings:

  - Added the required column `url` to the `Datastore` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Datastore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "db_id" TEXT NOT NULL,
    "deployment_id" TEXT NOT NULL,
    "url" TEXT NOT NULL
);
INSERT INTO "new_Datastore" ("db_id", "deployment_id", "id", "name", "userId") SELECT "db_id", "deployment_id", "id", "name", "userId" FROM "Datastore";
DROP TABLE "Datastore";
ALTER TABLE "new_Datastore" RENAME TO "Datastore";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
