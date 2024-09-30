-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transaction" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "sender" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Notification" ("amount", "created_at", "id", "message", "recipient", "sender", "transaction") SELECT "amount", "created_at", "id", "message", "recipient", "sender", "transaction" FROM "Notification";
DROP TABLE "Notification";
ALTER TABLE "new_Notification" RENAME TO "Notification";
CREATE UNIQUE INDEX "Notification_id_key" ON "Notification"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
