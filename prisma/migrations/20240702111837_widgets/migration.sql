-- CreateTable
CREATE TABLE "Widget" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "store" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "vision" TEXT NOT NULL,
    "pdf" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "styleType" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "welcomeMsg" TEXT NOT NULL,
    "radius" TEXT NOT NULL,
    "primaryColor" TEXT NOT NULL,
    "bgColor" TEXT NOT NULL,
    "primaryTextColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,
    "waveColor" TEXT NOT NULL,
    "cssContainer" TEXT NOT NULL,
    "cssInput" TEXT NOT NULL,
    "allowedSources" TEXT NOT NULL
);
