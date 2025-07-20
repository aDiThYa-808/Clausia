-- CreateEnum
CREATE TYPE "PolicyStatus" AS ENUM ('completed', 'draft', 'failed');

-- CreateTable
CREATE TABLE "Policy" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "ageGroup" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "introduction" TEXT NOT NULL,
    "sections" JSONB NOT NULL,
    "tokensUsed" INTEGER NOT NULL,
    "creditsUsed" INTEGER NOT NULL,
    "status" "PolicyStatus" NOT NULL DEFAULT 'completed',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
