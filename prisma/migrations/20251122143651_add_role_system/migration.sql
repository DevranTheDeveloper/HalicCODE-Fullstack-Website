/*
Migration: Add Role System

This migration:
1. Creates Role table with default roles
2. Migrates existing Member.role strings to Role foreign keys
3. Updates Member table structure
*/

-- Step 1: Create Role table
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nameTr" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Step 2: Insert default roles
INSERT INTO
    "Role" (
        "name",
        "nameTr",
        "order",
        "updatedAt"
    )
VALUES (
        'Head',
        'Lider',
        1,
        CURRENT_TIMESTAMP
    ),
    (
        'Social Media',
        'Sosyal Medya',
        2,
        CURRENT_TIMESTAMP
    ),
    (
        'Sponsor Finder',
        'Sponsor Sorumlusu',
        3,
        CURRENT_TIMESTAMP
    ),
    (
        'Member',
        'Üye',
        4,
        CURRENT_TIMESTAMP
    );

-- Step 3: Add temporary roleId column to Member
PRAGMA foreign_keys = OFF;

ALTER TABLE "Member" ADD COLUMN "roleId" INTEGER;

-- Step 4: Migrate existing role strings to roleId
UPDATE "Member" SET "roleId" = (SELECT "id" FROM "Role" WHERE "name" = "Member"."role");

-- Step 5: Make roleId NOT NULL (now all have values)
CREATE TABLE "new_Member" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "bio" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Member_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Step 6: Copy data (role column excluded, roleId included)
INSERT INTO
    "new_Member" (
        "id",
        "name",
        "roleId",
        "imageUrl",
        "bio",
        "linkedin",
        "twitter",
        "instagram",
        "email",
        "createdAt",
        "updatedAt"
    )
SELECT "id", "name", "roleId", "imageUrl", "bio", "linkedin", "twitter", "instagram", "email", "createdAt", "updatedAt"
FROM "Member";

DROP TABLE "Member";

ALTER TABLE "new_Member" RENAME TO "Member";

PRAGMA foreign_keys = ON;

-- Step 7: Create unique index on Role.name
CREATE UNIQUE INDEX "Role_name_key" ON "Role" ("name");