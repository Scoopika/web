-- CreateTable
CREATE TABLE "Waitlistv1" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Waitlistv1_email_key" ON "Waitlistv1"("email");
