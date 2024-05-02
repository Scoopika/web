-- CreateTable
CREATE TABLE "Datastore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "db_id" TEXT NOT NULL,
    "deployment_id" TEXT NOT NULL
);
