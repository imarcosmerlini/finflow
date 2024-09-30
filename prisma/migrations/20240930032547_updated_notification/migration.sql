/*
  Warnings:

  - Added the required column `recipien_id` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_from_id` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_to_id` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transaction_to_id" INTEGER NOT NULL,
    "recipien_id" INTEGER NOT NULL,
    "transaction_from_id" INTEGER NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Notification" ("amount", "created_at", "id", "message", "sender_id") SELECT "amount", "created_at", "id", "message", "sender_id" FROM "Notification";
DROP TABLE "Notification";
ALTER TABLE "new_Notification" RENAME TO "Notification";
CREATE UNIQUE INDEX "Notification_id_key" ON "Notification"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
