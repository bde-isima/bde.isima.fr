-- CreateEnum
CREATE TYPE "HonorMemberStatut" AS ENUM ('NONE', 'CONTRIB_LIKE', 'ACTIVE_MEMBER');

-- Remove old constraints
ALTER TABLE "EventSubscription" DROP CONSTRAINT "EventSubscription_userId_fkey";
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_emitterId_fkey";
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";
ALTER TABLE "UserStats" DROP CONSTRAINT "UserStats_userId_fkey";
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";
ALTER TABLE "LoginRequest" DROP CONSTRAINT "LoginRequest_userId_fkey";
ALTER TABLE "VoteRequest" DROP CONSTRAINT "VoteRequest_userId_fkey";
ALTER TABLE "User" DROP CONSTRAINT "User_pkey";
DROP INDEX "User_email_key";
DROP INDEX "User_card_key";

-- Move the old table into a temp table
ALTER TABLE "User" RENAME TO "OldUser";

-- Create the new table with new columns
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "nickname" TEXT,
    "birthdate" DATE,
    "email" TEXT NOT NULL,
    "address" JSONB,
    "card" INTEGER NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "roles" TEXT[],
    "promotionId" TEXT,
    "image" TEXT,
    "contributor_until" DATE,
    "honor_member" "HonorMemberStatut" NOT NULL DEFAULT 'NONE',
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Set unique constraint to email and card
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_card_key" ON "User"("card");

-- Migrate constraints
ALTER TABLE "EventSubscription" ADD CONSTRAINT "EventSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_emitterId_fkey" FOREIGN KEY ("emitterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "LoginRequest" ADD CONSTRAINT "LoginRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "VoteRequest" ADD CONSTRAINT "VoteRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "User" ADD CONSTRAINT "User_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Copy data from old to new table
INSERT INTO "User" (
  "id",
  "lastname",
  "firstname",
  "nickname",
  "birthdate",
  "email",
  "address",
  "card",
  "balance",
  "roles",
  "promotionId",
  "image",
  "is_enabled",
  "createdAt",
  "updatedAt",
  "contributor_until"
) SELECT
  "id",
  "lastname",
  "firstname",
  "nickname",
  "birthdate",
  "email",
  "address",
  "card",
  "balance",
  "roles",
  "promotionId",
  "image",
  "is_enabled",
  "createdAt",
  "updatedAt",
  CASE "is_member" WHEN TRUE THEN (CASE
    WHEN extract(month from now())>=9 THEN make_date(cast(extract(year from now())+1 as integer),9,1)
    ELSE make_date(cast(extract(year from now()) as integer),9,1)
  END) END AS "contributor_until"
FROM "OldUser";

-- Delete the legacy table
DROP TABLE "OldUser";
