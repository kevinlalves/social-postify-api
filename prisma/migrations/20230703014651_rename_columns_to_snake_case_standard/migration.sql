/*
  Warnings:

  - You are about to drop the column `createdAt` on the `platforms` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `platforms` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `publications` table. All the data in the column will be lost.
  - You are about to drop the column `publishAt` on the `publications` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `publications` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `publications` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `platforms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publish_at` to the `publications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `publications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `publications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "publications" DROP CONSTRAINT "publications_userId_fkey";

-- AlterTable
ALTER TABLE "platforms" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "publications" DROP COLUMN "createdAt",
DROP COLUMN "publishAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "publish_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
