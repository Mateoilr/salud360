-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'non_binary', 'other');

-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('fertility', 'self_awareness', 'couple', 'wellness');

-- CreateEnum
CREATE TYPE "CoupleStatus" AS ENUM ('pending', 'active', 'disconnected');

-- CreateEnum
CREATE TYPE "ReminderFrequency" AS ENUM ('daily', 'weekly', 'monthly', 'once');

-- CreateEnum
CREATE TYPE "CheckupType" AS ENUM ('medical', 'mental', 'sexual');

-- CreateEnum
CREATE TYPE "InsightType" AS ENUM ('pattern', 'correlation', 'tip');

-- CreateEnum
CREATE TYPE "CycleType" AS ENUM ('menstrual', 'hormonal', 'custom');

-- CreateEnum
CREATE TYPE "SharedMomentType" AS ENUM ('emotional', 'conflict', 'sexual', 'conversation');

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "firebaseUid" TEXT,
    "email" TEXT,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "goal" "Goal" NOT NULL,
    "anonymousMode" BOOLEAN NOT NULL DEFAULT false,
    "theme" TEXT NOT NULL DEFAULT 'calm',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyEntry" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "mood" TEXT NOT NULL,
    "energyLevel" INTEGER NOT NULL,
    "libidoLevel" INTEGER NOT NULL,
    "sleepQuality" INTEGER NOT NULL,
    "stressLevel" INTEGER NOT NULL,
    "appetiteLevel" INTEGER NOT NULL,
    "symptoms" TEXT NOT NULL,
    "sexualActivity" BOOLEAN NOT NULL,
    "protectedSex" BOOLEAN NOT NULL,
    "satisfaction" TEXT,
    "notes" TEXT,

    CONSTRAINT "DailyEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cycle" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "type" "CycleType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "phase" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Cycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "frequency" "ReminderFrequency" NOT NULL,
    "time" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Checkup" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "type" "CheckupType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Checkup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insight" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "dateGenerated" TIMESTAMP(3) NOT NULL,
    "type" "InsightType" NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Insight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Couple" (
    "id" BIGSERIAL NOT NULL,
    "user1Id" BIGINT NOT NULL,
    "user2Id" BIGINT NOT NULL,
    "status" "CoupleStatus" NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Couple_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedMoment" (
    "id" BIGSERIAL NOT NULL,
    "coupleId" BIGINT NOT NULL,
    "type" "SharedMomentType" NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userReportedById" BIGINT NOT NULL,

    CONSTRAINT "SharedMoment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "targetGender" TEXT NOT NULL,
    "targetGoal" TEXT NOT NULL,
    "contentUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseUid_key" ON "User"("firebaseUid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "DailyEntry" ADD CONSTRAINT "DailyEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cycle" ADD CONSTRAINT "Cycle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkup" ADD CONSTRAINT "Checkup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insight" ADD CONSTRAINT "Insight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Couple" ADD CONSTRAINT "Couple_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Couple" ADD CONSTRAINT "Couple_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedMoment" ADD CONSTRAINT "SharedMoment_coupleId_fkey" FOREIGN KEY ("coupleId") REFERENCES "Couple"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedMoment" ADD CONSTRAINT "SharedMoment_userReportedById_fkey" FOREIGN KEY ("userReportedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
