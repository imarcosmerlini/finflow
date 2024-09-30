/*
  Warnings:

  - You are about to drop the column `recipien` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `recipient` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transaction" INTEGER NOT NULL,
    "recipient" INTEGER NOT NULL,
    "sender" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Notification" ("amount", "created_at", "id", "message", "sender", "transaction") SELECT "amount", "created_at", "id", "message", "sender", "transaction" FROM "Notification";
DROP TABLE "Notification";
ALTER TABLE "new_Notification" RENAME TO "Notification";
CREATE UNIQUE INDEX "Notification_id_key" ON "Notification"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
