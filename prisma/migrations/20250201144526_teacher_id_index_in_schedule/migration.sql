/*
  Warnings:

  - A unique constraint covering the columns `[teacher_id,dayOfWeek,timeStart,timeEnd]` on the table `schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "schedule_dayOfWeek_timeStart_timeEnd_key";

-- CreateIndex
CREATE UNIQUE INDEX "schedule_teacher_id_dayOfWeek_timeStart_timeEnd_key" ON "schedule"("teacher_id", "dayOfWeek", "timeStart", "timeEnd");
